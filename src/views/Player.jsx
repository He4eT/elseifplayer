import { h } from 'preact'

export default function ({params: {theme, encodedUrl}}) {
  const url = decodeURIComponent(encodedUrl)

  return (
    <div>
      {theme} <br/>
      {url}
    </div>)
}
