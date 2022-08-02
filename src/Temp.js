const Utility = require("./Utility");
const fs = require('fs');

fs.readFile('testData.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log();
  var escape = data.replaceAll("\\u00","%");
  console.log(decodeURIComponent(escape));
});
