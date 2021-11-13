let http = require('http');

http.createServer(function(req, res) {
  if (req.url == '/submitForm') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('C Test Case');
    res.end();
  }
}).listen(8080);
