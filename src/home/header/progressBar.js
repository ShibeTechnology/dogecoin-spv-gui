const {
    QBoxLayout,
    Direction,
    QLabel,
    QWidget,
    QProgressBar,
    AlignmentFlag,
} = require("@nodegui/nodegui")


class ProgressBar extends QWidget {
    constructor (sync) {
        super()

        const layout = new QBoxLayout(Direction.TopToBottom)

        // progress info
        this.progressInfo = new QLabel()
        this.progressInfo.setText(`${sync.height}/${sync.bestHeight}`)
        this.progressInfo.setInlineStyle('font-size: 14px;')

        // progress bar widget
        this.progressBar = new QProgressBar()
        // border-radius has to be half the height to work 
        this.progressBar.setStyleSheet(`
        QProgressBar {
            margin-top: 10px;
            margin-left: 80px;
            margin-right: 80px;
            border-radius: 4px;
            background: white;
            height: 6px;
        }
        QProgressBar::chunk {
            background-color: #ffe199;
            border-radius: 4px;
        }`)

        this.progressBar.setTextVisible(false)
        this.progressBar.setValue(sync.height/sync.bestHeight * 100)
        
        layout.addWidget(this.progressInfo, 0, AlignmentFlag.AlignHCenter)
        layout.addWidget(this.progressBar)

        this.setStyleSheet('margin-top: 100px;')
        this.setLayout(layout)
    }

    setProgress (sync) {
        // TODO: can we import enum states here ? but we want to avoid mixing spv node specific code
        switch (sync.state) {
            case 'init':
                this.progressInfo.setText(`0/0 (init)`)
                this.progressBar.setValue(0)
                break
            case 'syncing_headers':
                this.progressInfo.setText(`${sync.height}/${sync.bestHeight} (sync header)`)
                this.progressBar.setValue(sync.height/sync.bestHeight * 100)
                break
            case 'syncing_merkle_block':
                this.progressInfo.setText(`${sync.merkleHeight}/${sync.bestHeight} (sync block)`)
                this.progressBar.setValue(sync.merkleHeight/sync.bestHeight * 100)
                break
            case 'synchronized':
                this.progressInfo.setText(`Synchronized`)
                this.progressBar.setValue(100)
                break
            default:
                break
        }
    }
}

module.exports = ProgressBar