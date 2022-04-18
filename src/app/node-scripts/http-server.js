let http = require('http');
let convertHtmlToImage = require('./convert-html-to-image');

const port = 8080;

http.createServer(function(req, res) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    // 'Content-Type': 'text/html',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {

    if (req.url == '/submitForm') {
      parseRequestBody(req, res, headers);
      return;
    }
    else {
      res.writeHead(200, headers);
      res.end('Request Parsed');
      return;
    }

  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);

}).listen(port);

function convertToImage(data) {
  let date = new Date();
  return convertHtmlToImage.convertToPng(data, `output-image-${date.getTime()}`);
}

function parseRequestBody(req, res, headers) {
    // parsing request body
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    const { reqHeaders, reqMethod, reqURL } = req;

    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString(); // at this point, `body` has the entire request body stored in it as a string

      convertToImage(JSON.parse(body).data).then(response => {
        headers['Content-Type'] = 'application/json'

        if (response.success) {
          res.writeHead(200, headers);
        }
        else {
          res.writeHead(500, headers);
        }

        res.on('error', error => {
          console.error('Error: ', error)
        })

        res.end(JSON.stringify(response));
      });
    });
}
