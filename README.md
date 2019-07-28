![virtual workspace logo](https://github.com/elhenro/virtual-workspace/raw/master/logo.jpg "virtual workspace")


# immersive virtual workspace - prototype

[developer work space in immersive virtual reality](https://docs.google.com/document/d/1vtMmGNmNE933sKq1ePe0wcpHWbFTvI9m9ISGGGPY3WQ)

notice: this is a proof of concept

## dev setup

`git clone https://github.com/elhenro/virtual-workspace`

`cd virtual-workspace`

`npm i`

replace the ip adress with your ip for the websocket connection in `public/index.html` 

`npm run server-xterm.js`

## multi user setup

`cd networked-aframe`

`npm i`

`npm run easyrtc-install`

`npm start`

(in antother terminal)

again, replace the ip with yours in `networked-aframe/server/static/index.html` 

`npm start vrterm`


![software architecture](https://github.com/elhenro/virtual-workspace/raw/master/software-architecture.png "software architcture")
