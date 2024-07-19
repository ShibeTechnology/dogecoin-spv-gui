const debug = require('debug')('main')
const app = require('./app')
const path = require('path')

const network = process.env.NETWORK || 'testnet'
const dev = process.env.DEV

app({ network, dev })
  .catch(function (err) {
    debug(err)
  })
