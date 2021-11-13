import * as htmlToImage from 'html-to-image';

exports.convertToPng = function(domElement, imageTitle) {
  htmlToImage.toPng(domElement)
  .then(function (dataUrl) {
    download(dataUrl, './../template-images/' + imageTitle);
  })
}
