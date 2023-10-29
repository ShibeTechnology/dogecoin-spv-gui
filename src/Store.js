

// Contains all the information of the wallet to be shown in the GUI
class Store {
    constructor(init) {
        this.balance = init.balance
        this.transactions = init.transactions
        this.generateAddress = init.generateAddress
    }
}

module.exports = Store
