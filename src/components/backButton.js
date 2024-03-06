const {
    QPushButton,
    QIcon,
    QSize,
} = require("@nodegui/nodegui")

class BackButton extends QPushButton {
    constructor (viewManager) {
        super()

        const iconArrow = new QIcon('./assets/arrow_left_white.svg')

        this.setIcon(iconArrow)
        this.setIconSize(new QSize(30,30))
        this.addEventListener('clicked', () => viewManager.emit('changeView', 'home'))
    }
}

module.exports = BackButton