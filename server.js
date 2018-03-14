const express = require('express');
const path = require('path');
var request = require("request");
var fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/resolvepdf/*', (req, res , next) => {
  // downloadPDF();
  var pdfurl = req.params[0];
  console.log(pdfurl);

  request
    .get(pdfurl)
    .on('response', function (response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
    .on('error', function (err) {
      console.log(err)
    })
    .pipe(res)

})


app.listen(3100, () => console.log('Example app listening on port 3100!'))


function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[dmYHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}






