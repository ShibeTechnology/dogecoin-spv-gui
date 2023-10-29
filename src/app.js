const path = require("path")
const EventEmitter = require('events')
const {
    QApplication,
    QMainWindow,
    QMenu,
    QIcon,
    QSystemTrayIcon,
    QAction,
    QStackedWidget,
} = require("@nodegui/nodegui")

//Store
const Store = require('./Store')

// Screens
const Home = require('./home')
const Send = require('./send')
const Receive = require('./receive')
const Settings = require('./settings')

// icons path
const icon = "../assets/logo.png"
const iconWhite = "../assets/logo_white.png"

// Main windows and tray system
const win = new QMainWindow();
const trayIcon = new QIcon(path.resolve(__dirname, iconWhite))
const winIcon = new QIcon(path.resolve(__dirname, icon))

const tray = new QSystemTrayIcon()
tray.setIcon(trayIcon)
tray.show();
tray.setToolTip("grrr...")

const menu = new QMenu()
tray.setContextMenu(menu)

// -------------------
// Quit Action
// -------------------
const quitAction = new QAction()
quitAction.setText("Quit")
quitAction.setIcon(trayIcon)
quitAction.addEventListener("triggered", () => {
  const app = QApplication.instance()
  app.exit(0)
})

menu.addAction(quitAction)


// -------------------
// Main Window
// -------------------
win.setWindowTitle("Deadbrain wallet")
win.setWindowIcon(winIcon)
win.setFixedSize(460, 720)


// Fake transactions
let address = 'DJUngfL...vQteJfb'
let date = 'August 09, 2021'

let transactions = []
for (let i = 0; i < 20; i++) {
  let amount = Math.ceil(Math.random() * 100)
  if (i%2 == 0) {
    amount = - amount
  }

  let tx = {
    address,
    amount,
    date,
  }

  transactions.push(tx)
}


// -------------------
// Stacked Widget (manage views)
// -------------------
const views = new QStackedWidget()
const viewManager = new EventEmitter()
const store = new Store({ balance: 10297.88, transactions })

const send = new Send(viewManager, store)
const receive = new Receive(viewManager, store)
const home = new Home(viewManager, store)
const settings = new Settings(viewManager)

views.addWidget(home)
views.addWidget(send)
views.addWidget(receive)
views.addWidget(settings)

views.setCurrentWidget(home)

win.setCentralWidget(views)
win.setStyleSheet('QPushButton { border: none; }')


// Remove system window frame
//win.setWindowFlag(WindowType.FramelessWindowHint, true)

// View Manager
viewManager.on('changeView', (view) => {
    console.log(`change view to ${view}`)
    switch (view) {
      case 'send':
        views.setCurrentIndex(1)
        break
      case 'receive':
        views.setCurrentIndex(2)
        break
      case 'home':
        views.setCurrentIndex(0)
        break
      case 'settings':
        views.setCurrentIndex(3)
        break
      default:
        console.log('unknown view')
    }
})

win.show()

const qApp = QApplication.instance()
qApp.setQuitOnLastWindowClosed(false) // required so that app doesnt close if we close all windows.

global.win = win // To prevent win from being garbage collected.
global.tray = tray // To prevent system tray from being garbage collected.
