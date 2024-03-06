const {
    QWidget,
} = require("@nodegui/nodegui")

class View extends QWidget {
    constructor () {
        super()

        this.setStyleSheet("background-color: #131620;")
    }
}

module.exports = View