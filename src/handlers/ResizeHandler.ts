import { signal } from '../services/SignalsService'

export function enableResize(object:any) {
  // @ts-ignore
  signal.on('RESIZE', function ({ scale, stage, screen }) {
    object.scale.set(doScale(object, scale, screen))

    object.x = (stage.width - object.width) / 2
    object.y = (stage.height - object.height) / 2
  })

  return object
}


function doScale(object: { scale: { set: (arg0: any) => void }; width: number; height: number }, scale: any, screen: { width: number; height: number }) {
  object.scale.set(scale)

  return Math.max(screen.width / object.width, screen.height / object.height)
}
