const {
    QGridLayout,
    AlignmentFlag,
    QPushButton,
    QFrame,
    QPlainTextEdit,
} = require("@nodegui/nodegui")
const View = require('../components/view')

class MnemonicShow extends View {
    constructor (viewManager, mnemonic) {
        super()
        
        const layout = new QGridLayout()

        /* Text edit widget */
        const plainTextEdit = new QPlainTextEdit()
        plainTextEdit.setPlainText(mnemonic)
        plainTextEdit.setDisabled(true)
        plainTextEdit.setInlineStyle('margin: 180px 20px; border: none; font-size: 2em;')


        this.button = new QPushButton()
        this.button.setText('I have saved my mnemonic')
        this.button.setInlineStyle('padding: 5px; background-color: white; border-radius: 30%; color: #131620;')
        this.button.setFixedSize(240, 60)

        layout.addWidget(plainTextEdit, 0, 0, 1, 0, AlignmentFlag.AlignTop)
        layout.addWidget(this.button, 1, 0, 1, 0, AlignmentFlag.AlignCenter)

        // frame.setInlineStyle('border: none;')
        this.setInlineStyle('margin: 20px;')

        this.setLayout(layout)

        this.button.addEventListener('clicked', () => {
            viewManager.emit('completed', mnemonic)
        })

    }
}

module.exports = MnemonicShow