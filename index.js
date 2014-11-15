var emojis = require('./emojis.json')

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
    return emojis[c].char
  })
}

exports.toNames = function(buf) {
  return convert(buf, function(c) {
    return ':'+emojis[c].name+':'
  })
}

exports.toCustom = function(buf, fn) {
  return convert(buf, function(c) {
    return fn(c, emojis[c])
  })
}
