import { h } from 'preact'

export default function ({ style, text }) {
  const defaultContent = (<span>{text}</span>)

  const content = ({
    emptyLine: (<br />),
    subheader: (<strong>{text}</strong>)
  })[style] || defaultContent

  return (
    <div class={['message', style].join(' ')}>
      {content}
    </div>
  )
}
