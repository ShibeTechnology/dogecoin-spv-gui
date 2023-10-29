const {
    QBoxLayout,
    Direction,
    AlignmentFlag,
    QPixmap,
    QLabel,
    QFrame,
    QLineEdit,
} = require("@nodegui/nodegui")
var QRCode = require('qrcode')

const View = require('../components/View')
const Nav = require('../components/Nav')
const BackButton = require('../components/BackButton')

class Receive extends View {
    constructor (viewManager) {
        super()

        const layout = new QBoxLayout(Direction.TopToBottom)
        const buttonBack = new BackButton(viewManager)
        const nav = new Nav(buttonBack, 'Receive DOGE')
        

        // QRCODE ADDRESS
        let qrcodeImage = new QPixmap()

        const imageLabel = new QLabel()
        const imageFrame = new QFrame()
        const layoutLabel = new QBoxLayout(Direction.TopToBottom)
        qrcodeImage = qrcodeImage.scaled(160,160)
        

        // generate qrcode
        QRCode.toFile('assets/newqrcode.png','DJUngfLRQW93VMS7taZWxLpUgPEvQteJfb', function () {
            qrcodeImage.load('assets/newqrcode.png')
            imageLabel.setPixmap(qrcodeImage)
        })

        layoutLabel.addWidget(imageLabel, 0, AlignmentFlag.AlignHCenter)
        imageFrame.setLayout(layoutLabel)

        // ADDRESS INPUT
        const input = new QLineEdit()
        input.setText('DJUngfLRQW93VMS7taZWxLpUgPEvQteJfb')
        input.setFixedHeight(50)
        input.setInlineStyle('border : 1px solid silver; border-radius : 6px; margin: 0px 40;')
        input.setAlignment(AlignmentFlag.AlignCenter)
        input.setDisabled(true)
        input.addEventListener('MouseButtonPress', () => console.log('we should copy!'))

        // WARNING LABEL
        const warningLabel = new QLabel()
        warningLabel.setText('Send only Dogecoin (DOGE) to this address')
        warningLabel.setAlignment(AlignmentFlag.AlignCenter)

        layout.addWidget(nav, 0, AlignmentFlag.AlignTop)
        layout.addWidget(imageFrame, 1, AlignmentFlag.AlignTop)
        layout.addWidget(input, 3, AlignmentFlag.AlignTop)
        layout.addWidget(warningLabel, 10, AlignmentFlag.AlignTop)
        this.setLayout(layout)
    }
}

module.exports = Receive