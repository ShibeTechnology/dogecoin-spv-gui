const {
    QWidget,
    QIcon,
    QPushButton,
    QSize,
    QGridLayout,
} = require("@nodegui/nodegui")

const Balance = require('./Balance')
const Button = require('./Button')
const Nav = require('../../components/Nav')

// -------------------
// Header Widget
// -------------------
class Header extends QWidget {
    constructor (viewManager, store) {
        super()

        const layout = new QGridLayout()
        
        // Buttons        
        const send = new Button('Send', 'assets/arrow_up_white.svg', (checked)=>viewManager.emit('changeView', 'send'))
        const receive = new Button('Receive', 'assets/arrow_down_white.svg', (checked)=>viewManager.emit('changeView', 'receive'))
        
        // Settings button
        const iconSettings = new QIcon('./assets/settings_white.svg')
        const buttonSettings = new QPushButton()

        buttonSettings.setIcon(iconSettings)
        buttonSettings.setIconSize(new QSize(15,15))
        buttonSettings.addEventListener('clicked', () => viewManager.emit('changeView', 'settings'))


        const balance = new Balance(store.balance)
        const nav = new Nav(buttonSettings, 'Deadbrain Corp.')

        layout.addWidget(nav, 0, 0, 1, 4)
        layout.addWidget(balance, 1, 0, 1, 4)
        layout.addWidget(send, 2, 1, 1, 1, 4) // 4 AlignHCenter
        layout.addWidget(receive, 2, 2, 1, 1, 4) // 4 AlignHCenter
        
        this.setLayout(layout)
    }
}

module.exports = Header