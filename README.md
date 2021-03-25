# ifplayer

Interactive Fiction player for the web.
Powered by [cheap-glkote](https://github.com/He4eT/cheap-glkote) and [Emglken](https://github.com/curiousdannii/emglken).

To see a live demo, check out [https://he4et.github.io/ifplayer/](https://he4et.github.io/ifplayer/).

## Direct links

You can provide the direct link to your game:

`/#/play/encodedURL/[theme]/`
- `encodedURL` - storyfile location encoded with `encodeURIComponent`;
- `theme` - [UI theme](https://github.com/He4eT/ifplayer/blob/master/src/themes/themes.js), optional;

### Examples
- [Play "Lost Pig" with default or last used theme](https://he4et.github.io/ifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/);
- [Play "Lost Pig" with Nord theme](https://he4et.github.io/ifplayer/#/play/https%3A%2F%2Fmirror.ifarchive.org%2Fif-archive%2Fgames%2Fzcode%2FLostPig.z8/nord/);
