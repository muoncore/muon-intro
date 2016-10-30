var express = require('express');
var app = express();

app.use(express.static('web-public'));

app.use('/ui', express.static(__dirname + '/web-public'));

app.get('/', function (req, res) {
  res.redirect('/ui'); // in case we want to use some other URLs later
});

app.listen(3419, function () {
  console.log('UI Running http://localhost:3419');
});
