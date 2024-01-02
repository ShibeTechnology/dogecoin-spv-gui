const {
    QBoxLayout,
    Direction,
    AlignmentFlag,
    QTextEdit,
    QLineEdit,
    QIcon,
    QSize,
    QWidget,
    QPushButton,
    QSizePolicyPolicy,
    QSizePolicyPolicyFlag,
    QFrame,
} = require("@nodegui/nodegui")
const { KOINU } = require('dogecoin-spv/constants')

const View = require('../components/view')
const Nav = require('../components/nav')
const BackButton = require('../components/backButton')
const Input = require('./input')

class Send extends View {
    constructor (viewManager, store, sendTransaction) {
        super()

        this.inputAddress = new Input('PASTE', 'Address')
        this.inputAmount = new Input('MAX', 'Amount')
        this.sendTransaction = sendTransaction
    
        const layout = new QBoxLayout(Direction.TopToBottom)
        const buttonBack = new BackButton(viewManager)
        const nav = new Nav(buttonBack, 'Send DOGE')

        // Create Send button
        const frameSend = new QFrame()
        const buttonSend = new QPushButton()
        const layoutSend = new QBoxLayout(Direction.LeftToRight)

        buttonSend.setText('Send')
        buttonSend.addEventListener('clicked', this.send)
        buttonSend.setInlineStyle('background-color: white; border-radius: 30%; color: #131620;')
        buttonSend.setFixedSize(120, 60)

        layoutSend.addWidget(buttonSend, AlignmentFlag.AlignHCenter)
        frameSend.setLayout(layoutSend)

        layout.addWidget(nav, 1, AlignmentFlag.AlignTop)
        layout.addWidget(this.inputAddress, 1, AlignmentFlag.AlignTop)
        layout.addWidget(this.inputAmount, 6, AlignmentFlag.AlignTop)
        layout.addWidget(frameSend, 14, AlignmentFlag.AlignTop)

        this.setLayout(layout)
    }

    send = async () => {
        const address = this.inputAddress.text()
        const amount = BigInt(this.inputAmount.text()) * KOINU

        const hash = await this.sendTransaction(amount, address)

        console.log(hash.toString('hex'))
    }
}

module.exports = Send