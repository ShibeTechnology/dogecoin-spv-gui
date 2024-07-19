# Dogecoin SPV wallet GUI

This is the Graphic User Interface for the Dogecoin SPV wallet. It is built using Nodegui.

## Run dev

```
$ NETWORK=testnet DEV=true DEBUG=* npm start
```

Or with nodemon (this allow automatic reloading developing)

```
$ NETWORK=regtest DEV=true DEBUG="*,-nodemon:*" npm run dev
```

## Windows NSI

To create an installer you will need NSIS and then you can run the command
```
$ 'C:\Program Files (x86)\NSIS\makensis.exe' deadbrainwallet.nsi
```