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
  const imageData = data.imageData.map(element => {
    element.output = filePath;
    return element;
  });

  console.log('template: ', `
  <html>
    <head>
      <style>
        body {
          height: 2100px;
          width: 3000px;
        }
        .es-content-body {
          height: 100%;
          width: 100%;
        }
        .es-content.ui-draggable {
          height: 100%;
          width: 100%;
        }
        .adapt-img {
          height: 497px !important;
        }
      </style>
    </head>
    <body> ${domElement} </body>
  </html>
  `);

  try {
    return await nodeHtmlToImage({
      html: `
      <html>
        <head>
          <style>
            .es-content-body {
              height: 100%;
              width: 100%;
            }
            .es-content.ui-draggable {
              height: 100%;
              width: 100%;
            }
            .adapt-img {
              height: 497px !important;
            }
          </style>
        </head>
        <body> ${domElement} </body>
      </html>
      `,
      transparent: true,
      content: imageData
      // content: [{ imageUrl1: imageData[0].imageUrl1, output: filePath, }]
      // content: { imageUrl1: imageData[0].imageUrl1 }
      // content: { imageSource: base64Image }
    })
    .then(() => {
      // console.log('imageData ', imageData);
      console.log('domElement: ', domElement);
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
