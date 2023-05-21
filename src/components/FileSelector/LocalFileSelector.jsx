import { h } from 'preact'

export default function LocalFileSelector ({ theme, setLocation, buildLink }) {
  const fileInputHandler = ({ target }) => {
    const file = target.files[0]
    const url = `${URL.createObjectURL(file)}#${file.name}`

    setLocation(buildLink({ url, theme }))
  }

  return (
    <input
      type='file'
      onChange={fileInputHandler} />
  )
}
