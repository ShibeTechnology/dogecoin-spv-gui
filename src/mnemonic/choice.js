const {
    QMainWindow,
    QStackedWidget,
    QIcon,
    QPushButton,
    AlignmentFlag,
    QGridLayout,
    Direction,
    QLabel
} = require("@nodegui/nodegui")
const View = require('../components/view')

class MnemonicChoice extends View {
    constructor (viewManager) {
        super()
        
        const layout = new QGridLayout()

        this.buttonNewWallet = new QPushButton()
        this.buttonNewWallet.setText('New Wallet')
        this.buttonNewWallet.setInlineStyle('padding: 5px; background-color: white; border-radius: 30%; color: #131620;')
        this.buttonNewWallet.setFixedSize(240, 60)

        const orText = new QLabel()
        orText.setText('Or')

        this.buttonEnterMnemonic = new QPushButton()
        this.buttonEnterMnemonic.setText('Enter Mnemonic')
        this.buttonEnterMnemonic.setInlineStyle('padding: 5px; background-color: white; border-radius: 30%; color: #131620;')
        this.buttonEnterMnemonic.setFixedSize(240, 60)

        layout.addWidget(this.buttonNewWallet, 0, 0, 3, 0, AlignmentFlag.AlignCenter)
        layout.addWidget(orText, 1, 0, 3, 0, AlignmentFlag.AlignCenter)
        layout.addWidget(this.buttonEnterMnemonic, 2, 0, 3, 0, AlignmentFlag.AlignCenter)

        this.buttonNewWallet.addEventListener('clicked', () => {
            console.log('New Wallet clicked')
            viewManager.emit('changeView', 'new')
        })

        this.buttonEnterMnemonic.addEventListener('clicked', () => {
            console.log('Enter Mnemonic clicked')
            viewManager.emit('changeView', 'enter')
        })

        this.setLayout(layout)
    }
}

module.exports = MnemonicChoice