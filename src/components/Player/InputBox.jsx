import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

/* eslint-disable */
const keyCodes = {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_PAGEUP:   33,
  KEY_PAGEDOWN: 34,
  KEY_END:      35,
  KEY_HOME:     36,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40
}

const keyNames = {
  [keyCodes.KEY_BACKSPACE]: 'delete',
  [keyCodes.KEY_TAB]: 'tab',
  [keyCodes.KEY_RETURN]: 'return',
  [keyCodes.KEY_ESC]: 'escape',
  [keyCodes.KEY_PAGEUP]: 'pageup',
  [keyCodes.KEY_PAGEDOWN]: 'pagedown',
  [keyCodes.KEY_END]: 'end',
  [keyCodes.KEY_HOME]: 'home',
  [keyCodes.KEY_LEFT]: 'left',
  [keyCodes.KEY_UP]: 'up',
  [keyCodes.KEY_RIGHT]: 'right',
  [keyCodes.KEY_DOWN]: 'down'
}
/* eslint-enable */

export default function ({ currentWindow, inputType, sendMessage }) {
  const [inputText, setInputText] = useState('')
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current && inputEl.current.focus()
  }, [inputType])

  const send = x => {
    sendMessage(x, currentWindow)
    setInputText('')
  }

  const charHandler = event => {
    event.preventDefault()

    const key =
      keyNames[event.keyCode] ||
      event.key

    send(key)
  }

  const lineHandler = ({ keyCode, target: { value } }) => {
    if (keyCode === keyCodes.KEY_RETURN) {
      send(value)
    }
  }

  const inputHandlers = {
    char: {
      placeholder: 'Press any key here',
      onKeyDown: charHandler
    },
    line: {
      placeholder: ' > ',
      onKeyPress: lineHandler
    }
  }

  const enterFullscreen = _ =>
    document.documentElement.requestFullscreen()

  return (
    <input {...inputHandlers[inputType]}
      className='inputBox'
      ref={inputEl}
      value={inputText}
      autofocus
      autocomplete='off'
      onDblClick={enterFullscreen}
      onInput={({ target: { value } }) => setInputText(value)}
      type='search' />
  )
}
