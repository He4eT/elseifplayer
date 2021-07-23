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

export default function ({
  inputType,
  windows,
  currentWindowId,
  sendMessage
}) {
  const [targetWindow, setTargetWindow] = useState(null)
  const [inputText, setInputText] = useState('')
  const [lastInput, setLastInput] = useState('')
  const inputEl = useRef(null)

  useEffect(() => {
    setInputText('')
    inputEl.current && inputEl.current.focus()
  }, [inputType])

  useEffect(() => {
    setTargetWindow(
      windows
        .find(({ id }) =>
          id === currentWindowId))
  }, [currentWindowId, windows])

  const send = message => {
    sendMessage(
      message,
      inputType,
      targetWindow)
    setLastInput(message)
    setInputText('')
  }

  const charHandler = event =>
    (event.keyCode === 229
      ? charHandlerMobile
      : charHandlerDefault)(event)

  const charHandlerDefault = event => {
    event.preventDefault()

    const key =
      keyNames[event.keyCode] ||
      event.key

    send(key)
  }

  const charHandlerMobile = event =>
    setTimeout(_ => {
      send(event.target.value.slice(-1).toUpperCase())
      setInputText('')
    })

  const lineHandler = ({ keyCode, target: { value } }) => {
    if (keyCode === keyCodes.KEY_RETURN) {
      send(value)
    }
  }

  const lineArrowHandler = ({ keyCode }) => {
    if (keyCode === keyCodes.KEY_UP) {
      setInputText(lastInput)

      setTimeout(_ => {
        const end = lastInput.length
        inputEl.current.setSelectionRange(end, end)
      }, 0)
    }
    if (keyCode === keyCodes.KEY_DOWN) {
      setInputText('')
    }
  }

  const inputHandlers = {
    char: {
      maxlength: '1',
      autocapitalize: 'off',
      autocorrect: 'off',
      spellcheck: 'false',
      placeholder: 'Press any key here',
      onKeyDown: charHandler
    },
    line: {
      placeholder: ' > ',
      onKeyDown: lineArrowHandler,
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
