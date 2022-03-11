const mailService = require('./mailing-service');

const nodeHtmlToImage = require('node-html-to-image');

exports.convertToPng = function(data, imageTitle) {
  const domElement = data.payload;
  const reqParams = data.params;
  const fileName = `${imageTitle}.png`;
  const filePath = `./../template-images/${imageTitle}.png`;

  const template = `
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
  `

  try {
    return nodeHtmlToImage({
      output: filePath,
      html: `
      <html>
        <head>
          <style>
            body {
              width: 1000px;
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
              height: auto !important;
            }
          </style>
        </head>
        <body> ${domElement} </body>
      </html>
      `,
      transparent: true,
    })
    .then(() => {
      return mailService.sendMail(reqParams, fileName, filePath, template); // TODO: remove the template argument being passed to the function since, it is used only for debugging.
    }, error => console.log('Error while creating Image: ', error));
  } catch (error) {
    console.log('Some Error: ', error);
  }
}
