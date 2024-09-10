const path = require("path")
const EventEmitter = require('events')
const {
    QApplication,
    QMainWindow,
    QIcon,
    QStackedWidget,
    QMessageBox,
    QPushButton,
    QLabel,
    QGridLayout,
    QWidget,
    QPixmap,
    AlignmentFlag,
} = require("@nodegui/nodegui")

// Screens
const Home = require('./home')
const Send = require('./send')
const Receive = require('./receive')
const Settings = require('./settings')


// icons path
const icon = typeof __webpack_require__ === 'function' ? "./assets/logo.png" : "../assets/logo.png"

class Win extends QMainWindow {
  constructor (store, opts) {
    super()

    // Main windows and tray system
    const winIcon = new QIcon(path.resolve(__dirname, icon))

    // -------------------
    // Main Window
    // -------------------
    this.setWindowTitle("Deadbrain wallet")
    this.setWindowIcon(winIcon)
    this.setFixedSize(460, 720)

    // -------------------
    // Stacked Widget (manage views)
    // -------------------
    const views = new QStackedWidget()
    const viewManager = new EventEmitter()

    const send = new Send(viewManager, store, opts.sendTransaction)
    const receive = new Receive(viewManager)
    const home = new Home(viewManager, store)
    const settings = new Settings(viewManager)

    views.addWidget(home)
    views.addWidget(send)
    views.addWidget(receive)
    views.addWidget(settings)

    views.setCurrentWidget(home)

    this.setCentralWidget(views)
    this.setStyleSheet('QPushButton { border: none; }')


    // Remove system window frame
    //win.setWindowFlag(WindowType.FramelessWindowHint, true)

    // View Manager
    viewManager.on('changeView', async (view) => {
        console.log(`change view to ${view}`)
        switch (view) {
          case 'send':
            views.setCurrentIndex(1)
            break
          case 'receive':
            // TODO: the `await` could create laggy interface. Maybe we can have this in the store object ?
            let address = await opts.getAddress()
            receive.setAddress(address)
            views.setCurrentIndex(2)
            break
          case 'home':
            views.setCurrentIndex(0)
            break
          case 'settings':
            views.setCurrentIndex(3)
            break
          case 'mnemonic':
            views.setCurrentIndex(4)
            break
          default:
            console.log('unknown view')
        }
    })

    this.show()

    this.viewManager = viewManager

    if (opts.firstUse) {
      // if we are using the app for the first time we show a dialog box to inform that the app is not being really closing
      this.addEventListener('Close', () => {
        console.log('clicked on closed')

        const messageBox = new QMessageBox()
        messageBox.setWindowTitle('Deadbrain Wallet')
        messageBox.setText('Clicking on the cross doesn\'t leave the app. The app will run in the background. To fully close the app you can use the system tray icon.')
        
        const layout = messageBox.layout()

        const label = new QLabel()
        const image = new QPixmap('./assets/close_system_tray.jpg')
        label.setInlineStyle('margin: 20px;')

        label.setPixmap(image)
        layout.addWidget(label, 1, 0, 1, 0, AlignmentFlag.AlignHCenter)
        
        const button = new QPushButton()
        button.setText('Got it')
        messageBox.addButton(button, button.AcceptRole)
        messageBox.exec()
      })
  
    }

    const qApp = QApplication.instance()
    qApp.setQuitOnLastWindowClosed(false) // required so that app doesnt close if we close all windows.
  }
}

module.exports = Win
