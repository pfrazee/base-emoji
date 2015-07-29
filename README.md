# base emoji

You have base 16, base 64, and now, base emoji.

(Output a buffer in emojis.)

## example

`6ecd355b90e81e72c0e37c3b4023325b20fff8c58d4200c69e4fbd550876e6fe`

becomes

:busstop::crystal_ball::bamboo::bookmark::city_sunset::donut::arrow_lower_left::cake::copyright::dog::card_index::baseball::bear::arrow_up_down::baggage_claim::bookmark::arrow_right::euro::eight_pointed_black_star::cow::cinema::beer::100::cow2::clock230::black_square::cookie::blue_heart::abcd::camera::dolls::envelope:

## api

```js
var baseEmoji = require('base-emoji')
var buf = new Buffer('deadbeef', 'hex')
baseEmoji.toUnicode(buf)
// => '😞📕🆒📀'
baseEmoji.toNames(buf)
// => ':disappointed::closed_book::cool::dvd:'
baseEmoji.toCustom(buf, function(v, emoji) {
  return '<img src="/img/emoji/'+emoji.name+'.png" alt="'+emoji.char+'" title="'+emoji.name+'">'
})
// => '<img src="/img/emoji/disappointed.png" alt="😞" title="disappointed">...'
baseEmoji.fromUnicode(baseEmoji.toUnicode(buf))
// => <Buffer de ad be ef>
```

## encoding

The emojis used are in `emojis.json`. There are 843 emojis there, but the converter reads sequences of 8 bits at a time, and so only maps the value to the first 256 of them. To stay consistent with other renderings, make sure you don't change the order of your emojis.json.
