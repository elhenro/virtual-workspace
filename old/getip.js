'use strict';

let os = require('os')
let ifaces = os.networkInterfaces()

Object.keys(ifaces).forEach(function (ifname) {
  let alias = 0
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return
    }
    if (alias >= 1) {
      // console.log(ifname + ':' + alias, iface.address);
    } else {
      console.log(ifname, iface.address)
      // return iface.address
    }
    ++alias
  })
})
