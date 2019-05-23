const fs = require('fs')
const https = require('http')
const WebSocket = require('ws')
const os = require('os')
const pty = require('node-pty')
const path = require('path')
const port = 8080
const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash'
const server = new https.createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', connection => {
  const term = pty.spawn(shell, [], {
    cwd: process.env.HOME,
    env: process.env
  })
  term.on('data', (data) => {
    connection.send(data)
  })
  connection.on('message', (message) => {
    term.write(message)
  })
  term.once('close', () => {
    connection.removeAllListeners()
    connection.close()
  })
  connection.once('close', () => {
    term.removeAllListeners()
    term.destroy()
  })
})

server.on('request', (request, response) => {
  let reqUrl
  console.log(request.headers)
  if (request.url === '/') {
    reqUrl = 'index.html'
  }
  if (!reqUrl) reqUrl = request.url
  fs.readFile(path.join('public', reqUrl), 'utf8', (err, data) => {
    if(err) {
      console.error(err.message)
    }
    response.end(data)
  })
})
server.listen(port)
console.log('listening on port 8080')

