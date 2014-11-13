# base emoji

You have base 16, base 64, and now, base emoji.

(Output a buffer in emojis.)


## api

```
var baseEmoji = require('base-emoji')
var buf = new Buffer('deadbeef', 'hex')
baseEmoji.toUtf8(buf)
// => '🎯🕗😕🐬'
baseEmoji.toNames(buf)
// => ':dart::clock8::confused::dolphin:'
e.toCustom(buf, function(v, emojiName, emojiData) {
  return '<img src="/img/emoji/'+emojiName+'.png" alt="'+emojiData.character+'" title="'+emojiName+'">'
})
// => '<img src="/img/emoji/dart.png" alt="🎯" title="dart">...'
```