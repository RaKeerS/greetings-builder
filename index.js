let http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('Test Case');
    res.end();
}).listen(8080);