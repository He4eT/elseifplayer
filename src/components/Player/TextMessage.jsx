import { h } from 'preact'

export default function TextMessage ({ style, text }) {
  const defaultContent = (
    <span className={['message', style].join(' ')}>
      {text}
    </span>)

  return ({
    grid: (<div>{text}&nbsp;</div>),
    input: (<span className='message input'>&gt; {text}</span>),
    subheader: (<strong className='message subheader'>{text}</strong>),
    emphasized: (<em className='message emphasized'>{text}</em>),
    endOfLine: (<br />),
  })[style] || defaultContent
}
