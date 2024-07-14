const {
  QApplication,
  QMenu,
  QIcon,
  QSystemTrayIcon,
  QAction,
} = require("@nodegui/nodegui")
const path = require("path")

const iconWhite = typeof __webpack_require__ === 'function' ? "./assets/logo_white.png" : "../assets/logo_white.png"

class Tray extends QSystemTrayIcon {
  constructor(shutdown, reopen) {
    super()

    const trayIcon = new QIcon(path.resolve(__dirname, iconWhite))

    this.setIcon(trayIcon)
    this.show();
    this.setToolTip("grrr...")

    const menu = new QMenu()
    this.setContextMenu(menu)

    // -------------------
    // Quit Action
    // -------------------
    const quitAction = new QAction()
    quitAction.setText("Quit")
    quitAction.addEventListener("triggered", shutdown)

    // -------------------
    // Reopen Action
    // -------------------
    const reopenAction = new QAction()
    reopenAction.setText("Open")
    reopenAction.addEventListener("triggered", reopen)


    menu.addAction(quitAction)
    menu.addAction(reopenAction)

  }
}

module.exports = Tray
