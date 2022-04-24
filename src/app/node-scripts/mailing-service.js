let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

exports.sendMail = function(reqParams, fileName, filePath, template) { // TODO: remove the template argument from the function arguments since, it is used only for debugging.
  let emailBody = '';
  if (reqParams?.recipientName && reqParams?.recipientName?.toString()?.trim()?.length > 0) {
    emailBody = emailBody.concat(`<p> Dear ${reqParams?.recipientName}, </p>`);
  }

  if (reqParams?.customMessage && reqParams?.customMessage?.toString()?.trim()?.length > 0) {
    emailBody = emailBody.concat(`<p> ${reqParams.customMessage} </p>`);
  }

  emailBody = emailBody.concat(
    `<p> <img src="cid:${fileName}"/> </p>`
  );

  if (reqParams?.senderName && reqParams?.senderName?.toString()?.trim()?.length > 0) {
    emailBody = emailBody.concat(
      `<p> From, </p>
      <p> ${reqParams?.senderName} </p>`
    );
  }

  let mailOptions = {
    from: reqParams?.senderAddress,
    to: reqParams?.recipientAddress,
    cc: reqParams?.recipientAddressCC,
    bcc: reqParams?.recipientAddressBCC?.length > 0 ? reqParams?.recipientAddressBCC : '',
    subject: reqParams?.emailSubject,
    text: reqParams?.customMessage,
    html: emailBody,
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
      console.error('Email Error: ', error);
      return { error: `Error: ${error}`, data: template }; // TODO: remove the data: template property from the json object since, it is used only for debugging.
    });

}
