const fs = require('fs');
const data = fs.readFileSync('public/esp32.glb');
const str = data.toString('utf8');
const names = str.match(/"name":"[^"]+"/g);
if (names) {
  const uniqueNames = [...new Set(names.map(n => n.split('"')[3]))];
  console.log(uniqueNames.join('\n'));
}
