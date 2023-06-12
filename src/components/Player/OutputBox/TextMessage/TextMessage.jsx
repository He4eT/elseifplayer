import * as s from './TextMessage.module.scss'

export default function TextMessage ({ style, text }) {
  const defaultContent = (
    <span className={[s.message, s[style]].join(' ')}>
      {text}
    </span>)

  return ({
    grid:
      (text?.length > 0 ? <div>{text}</div> : <br />),
    input:
      (<span className={[s.message, s.input].join(' ')}>&gt; {text}</span>),
    subheader:
      (<strong className={[s.message, s.subheader].join(' ')}>{text}</strong>),
    emphasized:
      (<em className={[s.message, s.emphasized].join(' ')}>{text}</em>),
    endOfLine:
      (<br />),
  })[style] || defaultContent
}
