const {
    QPushButton,
    AlignmentFlag,
    QGridLayout,
    Direction,
    QLabel,
    QTextEdit,
} = require("@nodegui/nodegui")
const View = require('../components/view')

class MnemonicEnter extends View {
    constructor (viewManager) {
        super()

        const layout = new QGridLayout()

        const enterLabel = new QLabel()
        enterLabel.setText('Enter your mnemonic :')
        enterLabel.setFixedHeight(80)

        this.edit = new QTextEdit()
        this.edit.setInlineStyle('padding: 15px; background-color: white; border-radius: 2%; color: #131620;')
        this.edit.setFixedWidth(320)

        this.buttonValidate = new QPushButton()
        this.buttonValidate.setText('Validate')
        this.buttonValidate.setInlineStyle('padding: 5px; background-color: white; border-radius: 30%; color: #131620;')
        this.buttonValidate.setFixedSize(240, 60)
     
        // TODO: fix the layout so it doesn't look so weird
        layout.addWidget(enterLabel, 1, 0, 1, 0, AlignmentFlag.AlignCenter)
        layout.addWidget(this.edit, 2, 0, 1, 0, AlignmentFlag.AlignCenter)
        layout.addWidget(this.buttonValidate, 3, 0, 3, 0, AlignmentFlag.AlignCenter)

        this.buttonValidate.addEventListener('clicked', () => {
            // TODO: validate the mnemonic here
            const mnemonic = this.edit.toPlainText()
            viewManager.emit('completed', mnemonic)
        })

        this.setLayout(layout)
    }
}

module.exports = MnemonicEnter