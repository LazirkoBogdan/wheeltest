import { signal } from '../services/SignalsService'
import { view } from '../config/view'

signal.on('INITIAL RENDER', resize)

export function resize() {
  const screen = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const orientation = screen.width > screen.height ? 'land' : 'port'
  const stage = view.desktop[orientation]
  const scale = Math.min(screen.width / stage.width, screen.height / stage.height)

  const data = {
    orientation,
    scale,
    stage,
    screen,
  }

  signal.dispatch('RESIZE', data)
}

function init() {
  window.onresize = resize
  window.addEventListener('orientationchange', resize)

}

export const ResizeService = { init, resize }
