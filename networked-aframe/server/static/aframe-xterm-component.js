let terminalInstance = 0

// TODO: add space color theme
const TERMINAL_THEME = {
  theme_foreground: {
    'default': '#F8F8F8'
  },
  theme_background: {
    'default': '#121212'
  },
  theme_cursor: {
    'default': '#F66100'
  },
  theme_selection: {
    // 'default': 'rgba(255, 255, 255, 0.3)'
  },
  theme_black: {
    // 'default': '#000000'
  },
  theme_red: {
    // 'default': '#e06c75'
  },
  theme_brightRed: {
    // 'default': '#e06c75'
  },
  theme_green: {
    // 'default': '#A4EFA1'
  },
  theme_brightGreen: {
    // 'default': '#A4EFA1'
  },
  theme_brightYellow: {
    // 'default': '#EDDC96'
  },
  theme_yellow: {
    // 'default': '#EDDC96'
  },
  theme_magenta: {
    // 'default': '#e39ef7'
  },
  theme_brightMagenta: {
    // 'default': '#e39ef7'
  },
  theme_cyan: {
    // 'default': '#5fcbd8'
  },
  theme_brightBlue: {
    // 'default': '#5fcbd8'
  },
  theme_brightCyan: {
    // 'default': '#5fcbd8'
  },
  theme_blue: {
    // 'default': '#5fcbd8'
  },
  theme_white: {
    // 'default': '#d0d0d0'
  },
  theme_brightBlack: {
    // 'default': '#808080'
  },
  theme_brightWhite: {
    // 'default': '#ffffff'
  }
}

AFRAME.registerComponent('xterm', {
  schema: Object.assign({
    cols: {
      type: 'number',
      default: 80
    },
    rows: {
      type: 'number',
      default: 25
    },
  }, TERMINAL_THEME),

  write: function(message) {
    this.term.write(message)
  },
  writeln: function(m) {
    this.term.writeln(m)
  },
  clear: function() {
    this.term.clear()
  },
  init: function () {
    const terminalElement = document.createElement('div')
    terminalElement.setAttribute('style', `
      width: 512px;
      height: 256px;
      opacity: 0.0;
      overflow: hidden;
    `)
    this.el.appendChild(terminalElement)
    this.el.terminalElement = terminalElement
    const theme = Object.keys(this.data).reduce((theme, key) => {
      if (!key.startsWith('theme_')) return theme
      const data = this.data[key]
      if(!data) return theme
      theme[key.slice('theme_'.length)] = data
      return theme
    }, {})
    const term = new Terminal({
      theme: theme,
      allowTransparency: false,
      cursorBlink: true,
      disableStdin: false,
      rows: this.data.rows,
      cols: this.data.cols,
      fontSize: 100
    })
    this.term = term
    term.open(terminalElement)
    this.canvas = terminalElement.querySelector('.xterm-text-layer')
    this.canvas.id = 'terminal-' + (terminalInstance++)
    this.canvasContext = this.canvas.getContext('2d')
    this.cursorCanvas = terminalElement.querySelector('.xterm-cursor-layer')
    this.el.setAttribute('material', 'transparent', true)
    this.el.setAttribute('material', 'src', '#' + this.canvas.id)
    term.on('refresh', () => {
      const material = this.el.getObject3D('mesh').material
      if (!material.map) return
      this.canvasContext.drawImage(this.cursorCanvas, 0,0)
      material.map.needsUpdate = true
    })
    term.on('data', (data) => {
      this.el.emit('xterm-data', data)
    })
    this.el.addEventListener('click', () => {
      term.focus()
    })
  }
})
