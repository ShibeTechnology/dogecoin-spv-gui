const {
    QPushButton,
    QIcon,
    QSize,
} = require("@nodegui/nodegui")

const arrowLeft = typeof __webpack_require__ === 'function' ? "dist/assets/arrow_left_white.svg" : "./assets/arrow_left_white.svg"

class BackButton extends QPushButton {
    constructor (viewManager) {
        super()

        const iconArrow = new QIcon(arrowLeft)

        this.setIcon(iconArrow)
        this.setIconSize(new QSize(30,30))
        this.addEventListener('clicked', () => viewManager.emit('changeView', 'home'))
    }
}

module.exports = BackButton