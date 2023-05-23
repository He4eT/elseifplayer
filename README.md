# ElseIFPlayer

Interactive Fiction player for the web.
Powered by [cheap-glkote](https://github.com/He4eT/cheap-glkote) and [Emglken](https://github.com/curiousdannii/emglken).

To see a live demo, check out [https://he4et.github.io/elseifplayer/](https://he4et.github.io/elseifplayer/).

## Direct links

You can provide the direct link to your game:

`/#/mode/encodedURL/[theme]/`

- `mode` — player interface mode:
  - `play` — default multi-window mode.
  - `focus` — single window mode without additional windows, such as the status bar.
- `encodedURL` — storyfile location encoded with `encodeURIComponent`.
- `theme` — [UI theme](https://github.com/He4eT/elseifplayer/blob/master/src/themes/themes.js), optional.

### Examples
- [Play "Lost Pig" with default or last used theme](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/);
- [Play "Lost Pig" without statusbar with default or last used theme](https://he4et.github.io/elseifplayer/#/focus/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/);
- [Play "Lost Pig" with Nord theme](https://he4et.github.io/elseifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/nord/);
- [Play "Lost Pig" without statusbar with Dim theme](https://he4et.github.io/elseifplayer/#/focus/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/dim/);
