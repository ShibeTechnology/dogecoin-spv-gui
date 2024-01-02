const {
    QBoxLayout,
    Direction,
    AlignmentFlag,
    QPixmap,
    QLabel,
    QFrame,
    QLineEdit,
    QApplication,
    QMessageBox,
} = require("@nodegui/nodegui")
const QRCode = require('qrcode')
const notifier = require('node-notifier')

const View = require('../components/view')
const Nav = require('../components/nav')
const BackButton = require('../components/backButton')

class Receive extends View {
    constructor (viewManager) {
        super()

        const layout = new QBoxLayout(Direction.TopToBottom)
        const buttonBack = new BackButton(viewManager)
        const nav = new Nav(buttonBack, 'Receive DOGE')

        this.imageLabel = new QLabel()
        const imageFrame = new QFrame()
        const layoutLabel = new QBoxLayout(Direction.TopToBottom)


        layoutLabel.addWidget(this.imageLabel, 0, AlignmentFlag.AlignHCenter)
        imageFrame.setLayout(layoutLabel)
        imageFrame.setInlineStyle('margin-top: 60px;')

        // ADDRESS INPUT
        this.input = new QLineEdit()
        this.input.setFixedHeight(50)
        this.input.setInlineStyle('border : 1px solid silver; border-radius : 6px; margin: 0px 40;')
        this.input.setAlignment(AlignmentFlag.AlignCenter)
        this.input.setDisabled(true)
        this.input.addEventListener('MouseButtonPress', () => {
            const clipboard = QApplication.clipboard()
            clipboard.setText(this.input.text())

            notifier.notify({
                title: 'Deadbrain corp. wallet',
                message: 'Address copied in your clipboad!',
            })
        })

        // WARNING LABEL
        const warningLabel = new QLabel()
        warningLabel.setText('Send only Dogecoin (DOGE) to this address')
        warningLabel.setAlignment(AlignmentFlag.AlignCenter)

        layout.addWidget(nav, 0, AlignmentFlag.AlignTop)
        layout.addWidget(imageFrame, 1, AlignmentFlag.AlignTop)
        layout.addWidget(this.input, 3, AlignmentFlag.AlignTop)
        layout.addWidget(warningLabel, 10, AlignmentFlag.AlignTop)
        this.setLayout(layout)
    }

    setAddress (address) {
        // QRCODE ADDRESS
        let qrcodeImage = new QPixmap()
        qrcodeImage = qrcodeImage.scaled(160,160)

        // generate qrcode
        QRCode.toFile('assets/newqrcode.png', address, () => {
            qrcodeImage.load('assets/newqrcode.png')
            this.imageLabel.setPixmap(qrcodeImage)
        })
        this.input.setText(address)


    }
}

module.exports = Receive