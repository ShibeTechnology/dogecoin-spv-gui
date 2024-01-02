const {
    QBoxLayout,
    QLabel,
    QFrame,
    AlignmentFlag,
    QGridLayout,
    QWidget,
    Direction,
    QPushButton,
} = require("@nodegui/nodegui")

const TransactionList = require('./transactionList')

class History extends QWidget {
    constructor (store, showAllTxsAndHideProgressBar) {
        super()

        this.store = store

        // -------------------
        // History Header Widget
        // -------------------
        this.header = new QWidget()
        const headerLayout = new QBoxLayout(Direction.TopToBottom) 
        const headerLabel = new QLabel()
        this.allTransactionsButton = new QPushButton()
        this.hidden = true

        const labels = new QFrame()
        const labelsLayout = new QBoxLayout(Direction.LeftToRight)

        headerLabel.setText('Recent Transactions')
        headerLabel.setStyleSheet(`
            font-size: 18px;
            font-weight: bold;
        `)

        this.allTransactionsButton.setText('All transactions ⮝')
        this.allTransactionsButton.setStyleSheet(`
            color: #8a95a3;
        `)

        labelsLayout.addWidget(headerLabel, 0, AlignmentFlag.AlignLeft)
        labelsLayout.addWidget(this.allTransactionsButton, 0, AlignmentFlag.AlignRight)
        labels.setLayout(labelsLayout)


        //headerLayout.addWidget(dividerLabel, 0, AlignmentFlag.AlignHCenter)
        headerLayout.addWidget(labels, 1, AlignmentFlag.AlignTop)

        this.header.setLayout(headerLayout)


        // transaction history list
        this.history = new TransactionList(store.transactions)
        this.history.hide()

        // -------------------
        // History Component Widget
        // -------------------
        const layout = new QGridLayout()

        layout.addWidget(this.header, 0, 0, 1, 0, AlignmentFlag.AlignTop)
        layout.addWidget(this.history, 1, 0, 1, 0)
        this.setLayout(layout)
        this.setStyleSheet(`
            background-color: white;
            color: #131620;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        `)
        this.setContentsMargins(20, 0, 0, 20)
        this.setMaximumHeight(100)

        // events
        this.allTransactionsButton.addEventListener('clicked', showAllTxsAndHideProgressBar)
        this.store.on('changed', this.update)
    }

    update = () => {
        this.history.setTransactions(this.store.transactions)
    }

    hideTransactions = () => {
        if (this.hidden) {
            this.history.show()
            this.setMaximumHeight(16777215) // the value come from this.maximumHeight()
            this.setStyleSheet('background-color: white; color: #131620; border-top-left-radius: 12px; border-top-right-radius: 12px;')
            this.header.setStyleSheet('background-color: white;')
            this.allTransactionsButton.setText('All transactions ⮟')
            this.hidden = false
        } else {
            this.history.hide()
            this.setMaximumHeight(100)
            this.header.setStyleSheet('background-color: white;')
            this.allTransactionsButton.setText('All transactions ⮝')
            this.hidden = true
        }
    }

}

module.exports = History