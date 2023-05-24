/* @see https://github.com/monkeytypegame/monkeytype/blob/master/frontend/static/themes/_list.json */
const monkeyTypesThemes = [
  /* Paste json here! */
].map((theme) => theme)
  .filter((theme) => ![
    'dark', 'solarized_dark', 'solarized_light',
  ].includes(theme.name))
  .sort((a, b) => a.name.localeCompare(b.name))

const names = monkeyTypesThemes
  .map(({name}) => `'${name}',`).join('\n')

const css = monkeyTypesThemes
  .map((theme) => [
    `.${theme.name} {`,
    `  --bg-color: ${theme.bgColor};`,
    `  --main-color: ${theme.textColor};`,
    `  --accent-color: ${theme.mainColor};`,
    `  --input-color: ${theme.subColor};`,
    '}\n'].join('\n'))
  .join('\n')

console.log('/* List*/')
console.log(names)

console.log('/* CSS */')
console.log(css)
