import { h } from 'preact'

export default function ({ style, text }) {
  const defaultContent = (
    <span class={['message', style].join(' ')}>
      {text}
    </span>)

  return ({
    grid: (<div>{text}&nbsp;</div>),
    input: (<span class='message input'>&gt; {text}</span>),
    subheader: (<strong>{text}</strong>),
    emphasized: (<em>{text}</em>),
    endOfLine: (<br />)
  })[style] || defaultContent
}
