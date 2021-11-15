// // import * as htmlToImage from 'html-to-image';
// let htmlToImage = require('html-to-image');

// exports.convertToPng = function(domElement, imageTitle) {
//   // console.log('Inside html-to-image: ', domElement);
//   htmlToImage.toPng(domElement.toString())
//   .then(function (dataUrl) {
//     console.log('Inside html-to-image: ', dataUrl);
//     // download(dataUrl, './../template-images/' + imageTitle);
//   }, err => console.log(err));
// }

const mailService = require('./mailing-service');

const nodeHtmlToImage = require('node-html-to-image');

exports.convertToPng = async function(data, imageTitle) {
  const domElement = data.payload;
  const reqParams = data.params;
  const fileName = `${imageTitle}.png`;
  const filePath = `./../template-images/${imageTitle}.png`;
  try {
    return await nodeHtmlToImage({
      output: filePath,
      html: `
      <html>
        <head>
          <style>
            body {
              width: 800px;
              height: 800px;
            }
          </style>
        </head>
        <body> ${domElement} </body>
      </html>
      `,
      transparent: true,
    })
    .then(() => {
      console.log('reqParams: ', reqParams);
      console.log('Image Created Successfully!');

      return mailService.sendMail(reqParams, fileName, filePath);

    }, error => console.log('Error while creating Image: ', error));
  } catch (error) {
    console.log('Some Error: ', error);
  }
}

function sendEmail() {

}
