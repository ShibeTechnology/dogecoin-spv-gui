const debug = require('debug')('main')
const app = require('./app')

const network = process.env.NETWORK
const dev = process.env.DEV

app({ network, dev })
  .catch(function (err) {
    debug(err)
  })
