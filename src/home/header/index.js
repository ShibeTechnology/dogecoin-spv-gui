const {
    QWidget,
    QIcon,
    QPushButton,
    QSize,
    QGridLayout,
} = require("@nodegui/nodegui")

const Balance = require('./balance')
const Button = require('./button')
const Nav = require('../../components/nav')
const ProgressBar = require("./progressBar")

const arrowUp = typeof __webpack_require__ === 'function' ? 'dist/assets/arrow_up_white.svg' : 'assets/arrow_up_white.svg'
const arrowDown = typeof __webpack_require__ === 'function' ? 'dist/assets/arrow_down_white.svg' : 'assets/arrow_down_white.svg'
const settingsIcon = typeof __webpack_require__ === 'function' ? 'dist/assets/settings_white.svg' : 'assets/settings_white.svg'

// -------------------
// Header Widget
// -------------------
class Header extends QWidget {
    constructor (viewManager, store) {
        super()

        const layout = new QGridLayout()
        
        // Buttons        
        const send = new Button('Send', arrowUp, (checked)=>viewManager.emit('changeView', 'send'))
        const receive = new Button('Receive', arrowDown, (checked)=>viewManager.emit('changeView', 'receive'))
        
        // Settings button
        const iconSettings = new QIcon(settingsIcon)
        const buttonSettings = new QPushButton()

        buttonSettings.setIcon(iconSettings)
        buttonSettings.setIconSize(new QSize(15,15))
        buttonSettings.addEventListener('clicked', () => viewManager.emit('changeView', 'settings'))


        const balance = new Balance(store.balance)
        const nav = new Nav(buttonSettings, 'Deadbrain Corp.')

        // Progress bar
        this.progressBar = new ProgressBar({height: 0, bestHeight: 0, merkleHeight: 0})


        layout.addWidget(nav, 0, 0, 1, 4)
        layout.addWidget(balance, 1, 0, 1, 0, 4) // 4 AlignHCenter
        layout.addWidget(send, 2, 1, 1, 1, 4) // 4 AlignHCenter
        layout.addWidget(receive, 2, 2, 1, 1, 4) // 4 AlignHCenter
        layout.addWidget(this.progressBar, 4, 0, 4, 0)

        this.setLayout(layout)

        store.on('changed', () => {
            balance.setBalance(store.balance)
            this.progressBar.setProgress({ state: store.state, height: store.height, bestHeight: store.bestHeight, merkleHeight: store.merkleHeight })
        })
    }

    revealProgressBar () {
        if (this.progressBar.isVisible()) {
            this.progressBar.hide()
        } else {
            this.progressBar.show()
        }
    }
}

module.exports = Header