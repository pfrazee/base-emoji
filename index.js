var bitparser = require('bitparser')
var emojis = require('./emojis.json')

function toBuffer(v) {
  if (!Buffer.isBuffer(v))
    return new Buffer(v, 'hex')
  return v
}

function convert(buf, fn) {
  var out = ''
  buf = toBuffer(buf)
  var bp = bitparser(buf)
  while (bp.index < buf.length * 8) {
    try {
      out += fn(bp.readBits(9))
    } catch (e) {
      break
    }
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

if (!module.parent) {
  console.log('toUtf8: deadbeef')
  console.log(exports.toUtf8('deadbeef'))
  console.log('')
  console.log('toUtf8: 6ecd355b90e81e72c0e37c3b4023325b20f048c58d4200c69e4fbd550876e6fe')
  console.log(exports.toUtf8('6ecd355b90e81e72c0e37c3b4023325b20f048c58d4200c69e4fbd550876e6fe'))
  console.log('')
  console.log('toNames: deadbeef')
  console.log(exports.toNames('deadbeef'))
  console.log('')
  console.log('toNames: 6ecd355b90e81e72c0e37c3b4023325b20f048c58d4200c69e4fbd550876e6fe')
  console.log(exports.toNames('6ecd355b90e81e72c0e37c3b4023325b20f048c58d4200c69e4fbd550876e6fe'))
  console.log('')
}