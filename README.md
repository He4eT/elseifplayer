# [ElseIFPlayer](https://he4et.github.io/elseifplayer/)

Interactive Fiction player for the web.
Powered by [cheap-glkote](https://github.com/He4eT/cheap-glkote) and [Emglken](https://github.com/curiousdannii/emglken).

To see a live demo, check out [https://he4et.github.io/elseifplayer/](https://he4et.github.io/elseifplayer/).

## Getting Started

- Make shure that you have NodeJS and NPM installed
- Install required packages with `npm install`
- Run local development server with `npm run dev`

## Build

For making a production build use
`npm run build <public-url>`

- If you want to host player on `https://your.domain/` use `npm run build /`
- For `https://your.domain/some-directory/` use `npm run build /some-derectory`

## Direct links

You can provide the direct link to your game:

`/#/mode/encodedURL/[theme]/`

- `mode` — player interface mode:
  - `play` — default multi-window mode
  - `focus` — single window mode without additional windows, such as the status bar
- `encodedURL` — storyfile location encoded with `encodeURIComponent`
- `theme` — [UI theme](https://github.com/He4eT/elseifplayer/blob/master/src/themes/themes.js), optional

### CORS

If the player and your storyfile located on different domains
you shoud set appropriate [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) settings.

In case you cannot change the server settings [Parchment Proxy](https://iplayif.com/proxy/) can be used.

### Direct Link Examples

- [Play "Lost Pig" with default or last used theme](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/)
- [Play "Lost Pig" without statusbar with default or last used theme](https://he4et.github.io/elseifplayer/#/focus/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/)
- [Play "Lost Pig" with Nord theme](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/nord/)
- [Play "Lost Pig" without statusbar with Dim theme](https://he4et.github.io/elseifplayer/#/focus/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/dim/)
- [Play "Lost Pig" loaded with Parchment Proxy](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fiplayif.com%2Fproxy%2F%3Furl%3Dhttps%3A%2F%2Fifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8)
