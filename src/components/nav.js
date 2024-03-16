const {
    QWidget,
    QBoxLayout,
    QIcon,
    QPushButton,
    QLabel,
    QSize,
} = require("@nodegui/nodegui")

const moonIcon = typeof __webpack_require__ === 'function' ? "dist/assets/moon_white.svg" : "./assets/moon_white.svg"

class Nav extends QWidget {
    constructor (leftWidget, middleLabelText) {
        super()

        const layout = new QBoxLayout(0)

        // Deadbrain Label
        const label = new QLabel()
        label.setText(middleLabelText)
        label.setInlineStyle('color: white')

        
        // Moon icon
        const iconMoon = new QIcon(moonIcon)
        const buttonMoon = new QPushButton()

        buttonMoon.setIcon(iconMoon)
        buttonMoon.setIconSize(new QSize(15,15))
        buttonMoon.addEventListener('clicked', () => console.log('Moon clicked'))

        layout.addWidget(leftWidget)
        layout.addStretch()
        layout.addWidget(label)
        layout.addStretch()
        layout.addWidget(buttonMoon)
        
        this.setLayout(layout)
    }
}

module.exports = Nav