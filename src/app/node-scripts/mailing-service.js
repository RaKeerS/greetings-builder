let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: username goes here,
    // pass: password goes here
  }
});

exports.sendMail = async function(reqParams, fileName, filePath, template) {
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

  return await transporter.sendMail(mailOptions).then(info => {
      if (info) {
        console.log('Email success: ', info.response);
        return { success: 'Email Sent Successfully!' };
      }
    },
    error => {
      console.log('Email Error: ', error);
      return { error: `Error: ${error}`, data: template };
    });

}
