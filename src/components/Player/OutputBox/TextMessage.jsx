export default function TextMessage ({ style, text }) {
  const defaultContent = (
    <span className={['message', style].join(' ')}>
      {text}
    </span>)

  return ({
    grid: (text?.length > 0 ? <div>{text}</div> : <br />),
    input: (<span className='message input'>&gt; {text}</span>),
    subheader: (<strong className='message subheader'>{text}</strong>),
    emphasized: (<em className='message emphasized'>{text}</em>),
    endOfLine: (<br />),
  })[style] || defaultContent
}
