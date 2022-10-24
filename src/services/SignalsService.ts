import { Signal } from 'micro-signals'
import {log} from '../utils/Logger'

const signals:any = {}
const show = ['boolean', 'string', 'number']

function getSignal(name:string) {
  return signals[name] = signals[name] || new Signal()
}

function onCustom(name:string, handler:any, trigger:string, once:boolean) {
  function wrap(payload:any) {
    if (String(payload) == trigger) {
      once && off(name, wrap)
      handler(payload)
    }
  }

  getSignal(name).add(wrap)
}

export const signal = {
  dispatch,
  off,
  on,
  once,
  promise,
}

function once(name:string, handler:any) {
  const [signal, custom] = name.split('|')
  if (custom) {
    onCustom(signal, handler, custom, true)
  }
  else {
    getSignal(signal).addOnce(handler)
  }
}

function on(name:string, handler:any) {
  const [signal, custom] = name.split('|')
  if (custom) {
    onCustom(signal, handler, custom, false)
  }
  else {
    getSignal(signal).add(handler)
  }
}

function promise(name:string) {
  return new Promise((resolve) => once(name, resolve))
}

function off(name:string, handler:any) {
  getSignal(name).remove(handler)
}

function dispatch(name:string, payload?:any) {
  const details = show.includes(typeof payload) ? ` => ${payload}` : ''
  const [type] = name.split(':')
  log(`${name}${details}`, type)
  getSignal(name).dispatch(payload)
}
