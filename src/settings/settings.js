const {
    QLabel,
    QBoxLayout,
    AlignmentFlag,
    Direction
} = require("@nodegui/nodegui")
const View = require('../components/view')
const Nav = require('../components/nav')
const BackButton = require('../components/backButton')

class Settings extends View {
    constructor (viewManager) {
        super()

        const layout = new QBoxLayout(Direction.TopToBottom)
        const buttonBack = new BackButton(viewManager)
        const nav = new Nav(buttonBack, 'Settings')
        const label = new QLabel()
        
        label.setText('There is no settings yet.')
        label.setAlignment(AlignmentFlag.AlignCenter)

        layout.addWidget(nav, 0, AlignmentFlag.AlignTop)
        layout.addWidget(label, 1, AlignmentFlag.AlignTop)
        this.setLayout(layout)
    }
}


module.exports = Settings