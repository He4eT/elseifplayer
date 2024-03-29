export default function TargetURLSelector ({ theme, setLocation, buildLink }) {
  const urlRE = /^(http|https):\/\/[^ "]+$/

  const onKeyPress = ({ keyCode, target }) => {
    if (keyCode !== 13) return

    const url = encodeURI(target.value)

    if (urlRE.test(url)) {
      setLocation(buildLink({ url, theme }))
    }
  }

  return (
    <input
      type='text'
      placeholder='https://...'
      onKeyPress={onKeyPress} />
  )
}
