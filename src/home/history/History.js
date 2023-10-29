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

const TransactionList = require('./TransactionList')

class History extends QWidget {
    constructor (store) {
        super()

        // -------------------
        // History Header Widget
        // -------------------
        const header = new QWidget()
        const headerLayout = new QBoxLayout(Direction.TopToBottom) 
        const headerLabel = new QLabel()
        const allTransactionsButton = new QPushButton()
        let hidden = false

        const labels = new QFrame()
        const labelsLayout = new QBoxLayout(Direction.LeftToRight)

        headerLabel.setText('Recent Transactions')
        headerLabel.setStyleSheet(`
            font-size: 18px;
            font-weight: bold;
        `)

        allTransactionsButton.setText('All transactions ⮟')
        allTransactionsButton.setStyleSheet(`
            color: #8a95a3;
        `)

        labelsLayout.addWidget(headerLabel, 0, AlignmentFlag.AlignLeft)
        labelsLayout.addWidget(allTransactionsButton, 0, AlignmentFlag.AlignRight)
        labels.setLayout(labelsLayout)


        //headerLayout.addWidget(dividerLabel, 0, AlignmentFlag.AlignHCenter)
        headerLayout.addWidget(labels, 1, AlignmentFlag.AlignTop)

        header.setLayout(headerLayout)


        // transaction history list
        const history = new TransactionList(store.transactions)

        // -------------------
        // History Component Widget
        // -------------------
        const historySection = new QFrame()
        const layout = new QGridLayout()

        layout.addWidget(header, 0, 0, 1, 0, AlignmentFlag.AlignTop)
        layout.addWidget(history, 1, 0, 1, 0)
        this.setLayout(layout)
        this.setStyleSheet(`
            background-color: white;
            color: #131620;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        `)
        this.setContentsMargins(20, 0, 0, 20)

        allTransactionsButton.addEventListener('clicked', () => {
            if (hidden) {
                history.show()
                this.setMaximumHeight(16777215) // the value come from this.maximumHeight()
                this.setStyleSheet('background-color: white; color: #131620; border-top-left-radius: 12px; border-top-right-radius: 12px;')
                header.setStyleSheet('background-color: white;')
                allTransactionsButton.setText('All transactions ⮟')
                hidden = false
            } else {
                history.hide()
                this.setMaximumHeight(100)
                header.setStyleSheet('background-color: white;')
                allTransactionsButton.setText('All transactions ⮝')
                hidden = true
            }

        })

    }

}

module.exports = History