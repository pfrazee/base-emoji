var emoji = require('./index')
var emojis = require('./emojis.json')
var data = new Buffer(256)


for (var i=0; i < 256; i++) {
  data.writeUIntBE(i, i, 1)
}

console.log(data.toString('hex'))
console.log(emoji.toUnicode(data))

var encoded = emoji.toUnicode(data)
var decoded = emoji.fromUnicode(encoded)
if (decoded.toString('hex') === data.toString('hex'))
  return console.log('tests pass')

for (var i=0; i < 256; i++) {
  if (decoded.readUInt8(i) != i)
    console.log('byte', i, 'incorrect:', emojis[i])
}