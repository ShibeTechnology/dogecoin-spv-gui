const {
    QWidget,
    QBoxLayout,
    QIcon,
    QPushButton,
    QLabel,
    QSize,
} = require("@nodegui/nodegui")


class Nav extends QWidget {
    constructor (leftWidget, middleLabelText) {
        super()

        const layout = new QBoxLayout(0)

        // Deadbrain Label
        const label = new QLabel()
        label.setText(middleLabelText)

        
        // Moon icon
        const iconMoon = new QIcon('./assets/moon_white.svg')
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