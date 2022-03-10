let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: username goes here,
    // pass: password goes here
  }
});

exports.sendMail = function(reqParams, fileName, filePath, template) { // TODO: remove the template argument from the function arguments since, it is used only for debugging.
  let mailOptions = {
    from: reqParams.senderAddress,
    to: reqParams.recipientAddress,
    cc: reqParams.recipientAddressCC,
    bcc: reqParams?.recipientAddressBCC?.length > 0 ? reqParams.recipientAddressBCC : '',
    subject: reqParams.emailSubject,
    text: reqParams.customMessage,
    html: `<p> Dear ${reqParams.recipientName}, </p>
           <p> ${reqParams.customMessage} </p>
           <p> <img src="cid:${fileName}"/> </p>
           <p> From, </p>
           <p> ${reqParams.senderName} </p>`,
    attachments: [{
      filename: fileName,
      path: filePath,
      cid: fileName
    }]
  }

  return transporter.sendMail(mailOptions).then(info => {
      if (info) {
        return { success: 'Email Sent Successfully!' };
      }
    },
    error => {
      console.log('Email Error: ', error);
      return { error: `Error: ${error}`, data: template }; // TODO: remove the data: template property from the json object since, it is used only for debugging.
    });

}
