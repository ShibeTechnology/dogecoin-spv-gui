const {
    QWidget,
    QBoxLayout,
    QPushButton,
    QSize,
    QLabel,
    QIcon,
} = require("@nodegui/nodegui")

class Button extends QWidget {
    constructor (labelText, path, clickedFunc) {
        super()

        const layout = new QBoxLayout(2)
        const svg = new QIcon(path)
        const label = new QLabel()
        const button = new QPushButton()

        button.setIcon(svg)
        button.setIconSize(new QSize(30,30))
        button.addEventListener('clicked', clickedFunc)

        label.setText(labelText)

        layout.addWidget(button)
        layout.addWidget(label)

        this.setLayout(layout)
    }
}

module.exports = Button