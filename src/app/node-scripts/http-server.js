let http = require('http');
let convertHtmlToImage = require('./convert-html-to-image');

http.createServer(function(req, res) {
  if (req.url == '/submitForm') {
    // parsing request body
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    const { headers, method, url } = req;

    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chuck) => {
      body.push(chuck);
    }).on('end', () => {
      body = Buffer.concat(body).toString(); // at this point, `body` has the entire request body stored in it as a string
    });

    console.log('Hua re Hua!!!!!');

    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('D Test Case');
    res.end();
  }
}).listen(8080);

function convertToImage(domElement) {
  convertHtmlToImage.convertToImage(domElement);
}
