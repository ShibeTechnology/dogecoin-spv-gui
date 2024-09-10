const {
    QMainWindow,
    QStackedWidget,
    QIcon,
} = require("@nodegui/nodegui")
const path = require("path")
const EventEmitter = require('events')

// Screens
const MnemonicChoice = require('./choice')
const MnemonicShow = require('./show')
const MnemonicEnter = require('./enter')

// icons path
const icon = typeof __webpack_require__ === 'function' ? "./assets/logo.png" : "../assets/logo.png"

class Mnemonic extends QMainWindow {
    constructor (mnemonic) {
        super()

        const winIcon = new QIcon(path.resolve(__dirname, icon))

        this.setWindowTitle("Deadbrain wallet")
        this.setWindowIcon(winIcon)
        this.setFixedSize(460, 720)

        // -------------------
        // Stacked Widget (manage views)
        // -------------------
        const views = new QStackedWidget()
        const viewManager = new EventEmitter()

        const choice = new MnemonicChoice(viewManager)
        const show = new MnemonicShow(viewManager, mnemonic)
        const enter = new MnemonicEnter(viewManager)
    
        views.addWidget(choice)
        views.addWidget(show)
        views.addWidget(enter)

        views.setCurrentWidget(choice)
    
        this.setCentralWidget(views)
        this.setStyleSheet('background-color: #131620;')

        // View Manager
        viewManager.on('changeView', async (view) => {
            switch (view) {
                case 'new':
                views.setCurrentIndex(1)
                break
                case 'enter':
                views.setCurrentIndex(2)
                break
                default:
                console.log('unknown view')
            }
        })

        // -------------------
        // Event manager for completion
        // -------------------
        this.viewManager = viewManager

        this.show()
    }

    async completion () {
        return new Promise((resolve, reject) => {
            this.viewManager.on('completed', (mnemonic) => {
                // close the mnemonic window
                this.close()

                console.log("completed")

                // We return the menmonic in case we have entered one
                resolve(mnemonic)
            })
            this.viewManager.on('failed', () => {
                // close the mnemonic window
                this.close()
                reject()
            })
        })
    }
}

module.exports = Mnemonic