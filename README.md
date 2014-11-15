# base emoji

You have base 16, base 64, and now, base emoji.

(Output a buffer in emojis.)

## example

`6ecd355b90e81e72c0e37c3b4023325b20fff8c58d4200c69e4fbd550876e6fe`

becomes

:bulb::credit_card::baggage_claim::boar::church::dizzy::arrow_heading_down::busstop::construction::department_store::candy::bank::bath::arrow_right::baby_bottle::boar::arrow_left::egg::dvd::cop::children_crossing::battery::100::copyright::clock12::birthday::confounded::blossom::abcd::cake::disappointed::earth_asia:

## api

```js
var baseEmoji = require('base-emoji')
var buf = new Buffer('deadbeef', 'hex')
baseEmoji.toUtf8(buf)
// => '🎯🕗😕🐬'
baseEmoji.toNames(buf)
// => ':dart::clock8::confused::dolphin:'
e.toCustom(buf, function(v, emoji) {
  return '<img src="/img/emoji/'+emoji.name+'.png" alt="'+emoji.char+'" title="'+emoji.name+'">'
})
// => '<img src="/img/emoji/dart.png" alt="🎯" title="dart">...'
```

## encoding

The emojis used are in `emojis.json`. There are 854 emojis there, so the converter reads sequences of 9 bits at a time and maps the value to the first 512 of them. To stay consistent with other renderings, make sure you don't change the order of your emojis.json.