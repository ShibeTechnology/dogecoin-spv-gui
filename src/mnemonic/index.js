const {
    QMainWindow,
    QPlainTextEdit,
    QIcon,
    QPushButton,
    QFrame,
    QGridLayout,
    AlignmentFlag
    
} = require("@nodegui/nodegui")
const path = require("path")

// icons path
const icon = typeof __webpack_require__ === 'function' ? "./assets/logo.png" : "../assets/logo.png"

class Mnemonic extends QMainWindow {
    constructor (mnemonic) {
        super()

        const winIcon = new QIcon(path.resolve(__dirname, icon))

        this.setWindowTitle("Deadbrain wallet")
        this.setWindowIcon(winIcon)
        this.setFixedSize(460, 720)

        const frame = new QFrame()
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
        frame.setInlineStyle('margin: 20px;')

        frame.setLayout(layout)
        this.setCentralWidget(frame)

        this.setStyleSheet('background-color: #131620;')

        this.show()
    }

    async validateMnemonic () {
        return new Promise((resolve, reject) => {
            this.button.addEventListener('clicked', () => {
                // close the mnemonic window
                this.close()
                resolve()
            })

        })
    }
}

module.exports = Mnemonic