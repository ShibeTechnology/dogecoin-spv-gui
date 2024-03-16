const {
    QWidget,
    QBoxLayout,
    QLabel,
    QSizePolicyPolicy,
    AlignmentFlag
} = require("@nodegui/nodegui")
const { KOINU } = require('dogecoin-spv/constants')


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

        balanceLabel.setText((balance/KOINU).toLocaleString('en'))
        balanceLabel.setObjectName('balance-label')
        balanceLabel.setAlignment(AlignmentFlag.AlignRight)

        denominationLabel.setText('DOGE')
        denominationLabel.setObjectName('denomination-label')
        denominationLabel.setAlignment(AlignmentFlag.AlignLeft)

        layout.addWidget(balanceLabel, 0)
        layout.addWidget(denominationLabel, 0)
        layout.setContentsMargins(0, 40, 0, 20)

        box.addLayout(layout)
        
        this.setLayout(box)
        this.setStyleSheet(`
            #balance-label { font-weight: bold; font-size: 20px; color: white; }
            #denomination-label{ font-weight: bold; font-size: 20px; color: #a895a3; }
        `)

        // save for updating text later
        this.balanceLabel = balanceLabel
    }

    setBalance (balance) {
        this.balanceLabel.setText((balance/KOINU).toLocaleString('en'))
    }
}


module.exports = Balance