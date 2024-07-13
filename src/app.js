const SPVNode = require('dogecoin-spv/spvnode')
const Wallet = require('dogecoin-spv/wallet')
const Store = require('dogecoin-spv/store')
const { getSettings } = require('dogecoin-spv/settings')
const networks = require('dogecoin-spv/network')
const { MissingNetworkArg } = require('dogecoin-spv/error')
const { doubleHash } = require('dogecoin-spv/utils')
const { KOINU, MIN_FEE } = require('dogecoin-spv/constants')

const debug = require('debug')('app')
const fs = require('fs')
const path = require('path')
const process = require('process')

const Win = require('./win')
const Tray = require('./tray')
const { QApplication } = require("@nodegui/nodegui")
const Mnemonic = require('./mnemonic')

async function app (args) {
  if (typeof args.network !== 'string') {
    throw new MissingNetworkArg()
  }

  const settings = getSettings(args.network, args.dev)

  // Interface Store (keep track of all the data)
  const store = new Store()

  // Create data folders for data
  if (!fs.existsSync(settings.DATA_FOLDER) || !fs.existsSync(path.join(settings.DATA_FOLDER, 'spvnode')) || !fs.existsSync(path.join(settings.DATA_FOLDER, 'wallet'))) {
    fs.mkdirSync(settings.DATA_FOLDER, { recursive: true })
    fs.mkdirSync(path.join(settings.DATA_FOLDER, 'spvnode'))
    fs.mkdirSync(path.join(settings.DATA_FOLDER, 'wallet'))
  }

  const SEED_FILE = path.join(settings.DATA_FOLDER, 'seed.json')

  // Will be needed in the interface
  const sendTransaction = async (amount, address) => {
    // TODO: calculate fee properly
    const fee = MIN_FEE * KOINU
    const rawTransaction = await wallet.send(amount, address, fee)
    spvnode.sendRawTransaction(rawTransaction)
    debug('SENT !')
    const newBalance = await wallet.getBalance()
    store.setBalance(newBalance)
    return doubleHash(rawTransaction).reverse()
  }

  // Will be needed in the interface
  const getAddress = async () => { return await wallet.getAddress() }

  // Stopping the app
  const shutdown = async () => {
    if (spvnode.isShuttingDown()) {
      debug('Is already shutting down')
      return
    }

    debug('shutting down')

    if (spvnode.isShuttingDown()) { return }

    await spvnode.shutdown()

    const app = QApplication.instance()
    app.exit(0)
  }

  const getHistory = async () => {
    // Get all the transactions history
    let txs = await wallet.getAllTransactions()
    let transactions = new Map()
    for (let t of txs) {
      const utxo = t.value.utxo
      let amount = BigInt(utxo.value) / KOINU
      let address = wallet.pubkeyToAddress(Buffer.from(utxo.pubkey, 'hex'))
      let date = utxo.txid

      let tx = {
        address,
        amount,
        date,
      }

      transactions.set(utxo.txid,tx)

      if (t.value.txin) {
        const txin = t.value.txin
        let transaction = await wallet.db.getTx(txin.txid)

        // TODO: This is a shortcut because we are assuming the second utxo is the change one.
        // TODO: check if Fee is actually the MIN_FEE (we took a shortcut here)
        let amount = - BigInt(transaction.txOuts[0].value) / KOINU - MIN_FEE
        let address = wallet.pubkeyToAddress(Wallet.extractPubkeyHashFromP2PKH(Buffer.from(transaction.txOuts[0].pkScript)), true)
        let date = txin.txid

        let tx = {
          address,
          amount,
          date,
        }

        transactions.set(txin.txid, tx)
      }

    }
    store.setTransactions(Array.from(transactions.values()))
  }

  // Do we have seed already ?
  try {
    fs.accessSync(SEED_FILE)
  } catch (err) {
    const mnemonic = Wallet.generateMnemonic()
    let mnemonicScreen = new Mnemonic(mnemonic)
    await mnemonicScreen.validateMnemonic()
    Wallet.createSeedFile(mnemonic, SEED_FILE)
  }

  // Create interface with nodegui
  const ui = new Win(store, {getAddress, sendTransaction})
  const tray = new Tray(shutdown)

  // Create Wallet
  const wallet = new Wallet(settings)

  // set history in store
  getHistory()

  // get balance
  wallet.getBalance()
    .then(function (balance) {
      store.setBalance(balance)
    })

  wallet.getPaymentChannels()
    .then(function (paymentChannels) {
      debug(paymentChannels)
      store.setPaymentChannels(paymentChannels)
    })

  // Initiate wallet
  await wallet.init()
  // show main screen
  ui.showMainScreen()

  wallet.on('balance', function () {
    debug('BALANCE UPDATED!')
    wallet.getBalance()
      .then(function (newBalance) {
        store.setBalance(newBalance)
      })

    wallet.getPaymentChannels()
      .then(function (paymentChannels) {
        store.setPaymentChannels(paymentChannels)
      })
  })

  // always have this after calling wallet.init()
  wallet.on('updateFilter', async function (element) {
    debug(`New element to add to filter : ${element}`)
    await spvnode.updateFilter(element.toString('hex'))
  })

  const pubkeyHashes = await wallet.getAllpubkeyHashes()

  // Create SPV node
  const spvnode = new SPVNode(pubkeyHashes, settings)


  // REVIEW: instead of relying on event can I just pass the store to the SVP node ?
  // But it will mean the store and the node are depending on each others... Unless I make it optional
  // what is better? Emitting events or callback funtcions...
  spvnode.on('tx', async function (tx) {
    // Register tx to wallet! Maybe it ours... maybe not
    await wallet.addTxToWallet(tx)
    // We store the transactions again the store
    getHistory()
  })

  spvnode.on('synchronized', function (newData) {
    debug('Our node is synchronized')
    store.setSPVState(newData)
  })

  spvnode.on('newState', function (newData) {
    store.setSPVState(newData)
  })

  spvnode.on('reject', function (rejectMessage) {
    debug(rejectMessage)
    store.setRejectMessage(rejectMessage)
  })

  // catches ctrl+c event
  process.on('SIGINT', shutdown)

  // catches SIGTERM events
  process.on('SIGTERM', shutdown)

  // Add regtest peer
  if (args.network === networks.REGTEST) {
    await spvnode.addPeer(settings.NODE_IP, settings.DEFAULT_PORT)
  }

  await spvnode.start()

  // start synchronizing
  await spvnode.synchronize()
}

module.exports = app
