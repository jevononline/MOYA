var express = require('express');
var config = require('./config/index');
var opn = require('opn');

var port = process.env.PORT || config.build.port;
var autoOpenBrowser = !!config.build.autoOpenBrowser;

var app = express();
var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

var uri = 'http://localhost:' + port;
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
    console.log('server is started!!!');
  }
})


