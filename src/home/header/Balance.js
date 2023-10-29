const {
    QWidget,
    QBoxLayout,
    QLabel,
    QSizePolicyPolicy
} = require("@nodegui/nodegui")


// -------------------
// Balance Widget
// -------------------
class Balance extends QWidget {
    constructor (balance) {
        super()

        const layout = new QBoxLayout(0)
        const box = new QBoxLayout(0)
        
        const balanceLabel = new QLabel()
        const denominationLabel = new QLabel()
        
        balanceLabel.setText(balance.toLocaleString('en'))
        balanceLabel.setObjectName('balance-label')
        balanceLabel.setFixedSize(100, 50)
        
        denominationLabel.setText('DOGE')
        denominationLabel.setObjectName('denomination-label')
        denominationLabel.setFixedSize(50, 50)
        
        layout.addWidget(balanceLabel)
        layout.addWidget(denominationLabel)
        
        box.addLayout(layout)
        
        this.setLayout(box)
        this.setSizePolicy(QSizePolicyPolicy.Expanding, QSizePolicyPolicy.Fixed)
        this.setStyleSheet(`
            #balance { color: white; }
            #balance-label { font-weight: bold; font-size: 20px; }
            #denomination-label{ font-weight: bold; font-size: 16px; color: #a895a3 }
        `)
        // balance.setFixedHeight(230)
    }
}


module.exports = Balance