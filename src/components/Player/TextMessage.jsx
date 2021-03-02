import { h } from 'preact'

export default function ({ style, text }) {
  const defaultContent = (
    <span class={['message', style].join(' ')}>
      {text}
    </span>)

  return ({
    input: (<span class='message input'>&gt; {text}</span>),
    subheader: (<strong>{text}</strong>),
    endOfLine: (<br />)
  })[style] || defaultContent
}
