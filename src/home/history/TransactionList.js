const {
    QListWidget,
    QGridLayout,
    QSvgWidget,
    QSizePolicyPolicy,
    QListWidgetItem,
    QFrame,
    QLabel,
    QBoxLayout,
} = require("@nodegui/nodegui")

class TransactionList extends QListWidget {
    constructor (transactions) {
        super()

        const layout = new QBoxLayout(0)

        this.setLayout(layout)
        this.setSizePolicy(QSizePolicyPolicy.Expanding, QSizePolicyPolicy.Expanding)
        this.setObjectName('transaction-list')
        this.setStyleSheet(`
            #transaction-list { font-weight: bold; }
            QListWidget { padding: 0 20px; }
            QListWidget::item { border-top: 1px solid #8a95a3; }
        `)

        // -------------------
        // Transaction Items Widget
        // -------------------
        for (let transaction of transactions) {
            const item = new QListWidgetItem()

            // Create the transaction item widget
            const widget = new QFrame()
            const widgetLayout = new QGridLayout()
            const addressLabel = new QLabel()
            const balanceLabel = new QLabel()
            const dateLabel = new QLabel()
            const svgArrow = new QSvgWidget()

            const sign = transaction.amount < 0 ? '-' : '+'

            addressLabel.setText(transaction.address)

            balanceLabel.setText(`${sign} ${Math.abs(transaction.amount)} DOGE`)
            balanceLabel.setStyleSheet(' font-size: 12px; font-weight: bold; ')

            dateLabel.setText(transaction.date)
            dateLabel.setStyleSheet(' font-size: 12px; color: #8A95A3; ')
            
            if (sign === '+') {
                svgArrow.load('assets/arrow_up.svg')
            } else {
                svgArrow.load('assets/arrow_down.svg')
            }
            svgArrow.setFixedSize(30,30)
            svgArrow.adjustSize()

            widgetLayout.addWidget(svgArrow, 0, 0, 2)
            widgetLayout.addWidget(addressLabel, 0, 1, 1, 2)
            widgetLayout.addWidget(balanceLabel, 0, 4)
            widgetLayout.addWidget(dateLabel, 1, 1)
            widget.setLayout(widgetLayout)

            item.setSizeHint(widget.sizeHint())

            this.addItem(item)
            this.setItemWidget(item, widget)
        }
    }
}

module.exports = TransactionList