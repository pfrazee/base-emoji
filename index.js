var emojis = require('./emojis.json')

function toBuffer(v) {
  if (!Buffer.isBuffer(v))
    return new Buffer(v, 'hex')
  return v
}

function convert(buf, fn) {
  buf = toBuffer(buf)
  var out = ''
  var n =0;
  for (var i = 0; i < buf.length; i++) {
    out += fn(buf.readUInt8(i))
    n++
  }
  return out
}

exports.toUnicode =
exports.toUtf8 = function(buf) { // toUtf8 is legacy, it's inaccurate - JS is utf16
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

exports.fromUnicode = function (s) {
  s = getSymbols(s)
  var buf = new Buffer(s.length)
  s.forEach(function (symbol, index) {
    for (var i=0; i < emojis.length; i++) {
      if (emojis[i].char == symbol) {
        buf.writeUIntBE(i, index, 1)
        break
      }
    }
    if (i == emojis.length)
      throw new Error('Failed to match symbol: ' + symbol + ' (' + symbol.charCodeAt(0) + ' ' + symbol.charCodeAt(1) + ')')
  })
  return buf
}

// https://mathiasbynens.be/notes/javascript-unicode
// ^ doing the lord's work
function getSymbols(string) {
  var length = string.length;
  var index = -1;
  var output = [];
  var character;
  var charCode;
  while (++index < length) {
    character = string.charAt(index);
    charCode = character.charCodeAt(0);
    if (charCode >= 0xaa && charCode <= 0xDBFF) {
      // Note: this doesn’t account for lone high surrogates;
      // you’d need even more code for that!
      output.push(character + string.charAt(++index));
    } else { 
      output.push(character);
    }
  }
  return output;
}
