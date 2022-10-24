

const colors:object = {
  BUTTON: 'darkseagreen',
  STATE: 'steelblue',
  ACTION: 'lightsteelblue',
  SOUND: 'tan',
}

function color(type:string) {
  // @ts-ignore
  const back = colors[type] || 'silver'
  return `background: ${back}; color: black;`
}

export function log(message:string, type:string = '') {
    if (typeof message == 'string') {
      console.log(`%c${message}`, color(type))
    }
    else {
      console.log(message)
    }
}
