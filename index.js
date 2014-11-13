var emojis = require('emoji-named-characters')
var sorted = Object.keys(emojis).sort(function(a, b) {
  var aChar = emojis[a].character
  var bChar = emojis[b].character
  if (aChar < bChar) return -1
  if (bChar < aChar) return 1
  return 0
})
var emojiSubset = sorted.slice(0, 256)

function toBuffer(v) {
  if (!Buffer.isBuffer(v))
    return new Buffer(v, 'hex')
  return v
}

function convert(buf, fn) {
  buf = toBuffer(buf)
  var out = ''
  for (var i = 0; i < buf.length; i++) {
    out += fn(buf.readUInt8(i))
  }
  return out
}

exports.toUtf8 = function(buf) {
  return convert(buf, function(c) {
    return emojis[emojiSubset[c]].character
  })
}

exports.toNames = function(buf) {
  return convert(buf, function(c) {
    return ':'+emojiSubset[c]+':'
  })
}

exports.toCustom = function(buf, fn) {
  return convert(buf, function(c) {
    return fn(c, emojiSubset[c], emojis[emojiSubset[c]])
  })
}
