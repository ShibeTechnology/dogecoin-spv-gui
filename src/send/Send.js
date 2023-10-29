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

const View = require('../components/View')
const Nav = require('../components/Nav')
const BackButton = require('../components/BackButton')
const Input = require('./Input')

class Send extends View {
    constructor (viewManager) {
        super()

        const layout = new QBoxLayout(Direction.TopToBottom)
        const buttonBack = new BackButton(viewManager)
        const nav = new Nav(buttonBack, 'Send DOGE')

        // Create input address
        const inputAddress = new Input('PASTE', 'Address')
        const inputAmount = new Input('MAX', 'Amount')

        // Create Send button
        const frameSend = new QFrame()
        const buttonSend = new QPushButton()
        const layoutSend = new QBoxLayout(Direction.LeftToRight)

        buttonSend.setText('Send')
        buttonSend.addEventListener('clicked', () => console.log('Send clicked'))
        buttonSend.setInlineStyle('background-color: white; border-radius: 30%; color: #131620;')
        buttonSend.setFixedSize(120, 60)

        layoutSend.addWidget(buttonSend, AlignmentFlag.AlignHCenter)
        frameSend.setLayout(layoutSend)

        layout.addWidget(nav, 1, AlignmentFlag.AlignTop)
        layout.addWidget(inputAddress, 1, AlignmentFlag.AlignTop)
        layout.addWidget(inputAmount, 6, AlignmentFlag.AlignTop)
        layout.addWidget(frameSend, 14, AlignmentFlag.AlignTop)

        this.setLayout(layout)
    }
}

module.exports = Send