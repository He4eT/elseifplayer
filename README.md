# ElseIFPlayer

ElseIFPlayer is an interactive fiction player for the web.
It's powered by [cheap-glkote](https://github.com/He4eT/cheap-glkote) and [Emglken](https://github.com/curiousdannii/emglken).

Player available here: [https://he4et.github.io/elseifplayer/](https://he4et.github.io/elseifplayer/).

## Getting Started

- Ensure that you have Node.js and NPM installed on your system.
- Install the required packages by running the command `npm install` in your project directory.
- Launch the local development server using `npm run dev`.

## Build

To create a production build, use the following command:
```
npm run build <public-url>
```

- If you intend to host the player on `https://your.domain/`, use `npm run build /`.
- For hosting it in a specific directory like `https://your.domain/some-directory/`, use `npm run build /some-directory`.

## Direct links

You can provide a direct link to a specific game using the following URL format:
```
/#/<mode>/<encodedURL>/[theme]/
```

- `mode` specifies the player interface mode:
  - `play`: the default multi-window mode
  - `focus`: the single-window mode without additional windows, such as the status bar
- `encodedURL` represents the location of the storyfile encoded with `encodeURIComponent`.
- `theme` is optional and allows you to choose a specific UI theme.

### CORS

If the player and your storyfile are located on different domains,
you need to use appropriate [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) settings.

If you cannot modify the server settings, you can use the [Parchment Proxy](https://iplayif.com/proxy/) as an alternative.

### Direct Link Examples

- [Play "Lost Pig" with default or last used theme](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/)
- [Play "Lost Pig" without statusbar with default or last used theme](https://he4et.github.io/elseifplayer/#/focus/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/)
- [Play "Lost Pig" with Nord theme](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/nord/)
- [Play "Lost Pig" without statusbar with Dim theme](https://he4et.github.io/elseifplayer/#/focus/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/dim/)
- [Play "Lost Pig" loaded with Parchment Proxy](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fiplayif.com%2Fproxy%2F%3Furl%3Dhttps%3A%2F%2Fifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8)

## License

ElseIFPlayer is distributed under the MIT License.
However, please remember to respect the licenses of the interpreters
listed on the
[Emglken page](https://github.com/curiousdannii/emglken#included-projects).
