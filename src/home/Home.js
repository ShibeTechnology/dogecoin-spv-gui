const {
    QWidget,
    QGridLayout,
    AlignmentFlag,
} = require("@nodegui/nodegui")

const History = require('./history/History')
const Header = require("./header")

class Home extends QWidget {
    constructor (viewManager, store) {
        super()
        
        const layout = new QGridLayout()

        const header = new Header(viewManager, store)
        const history = new History(store)

        layout.addWidget(header, 0, 0, 1, 0, AlignmentFlag.AlignTop)
        layout.addWidget(history, 1, 0, 1, 0)
        layout.setContentsMargins(0,0,0,0)
        layout.setSpacing(0)
        
        this.setLayout(layout)
        this.setStyleSheet("background-color: #131620;")
    }
}

module.exports = Home