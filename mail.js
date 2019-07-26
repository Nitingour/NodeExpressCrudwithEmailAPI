var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demoapitesing@gmail.com',
    pass: 'password'
  }
});

var mailOptions = {
  from: 'demoapitesing@gmail.com',
  to: 'ngour@edsystango.com',
  subject: 'Sending Email using Node.js',
  text: 'Hello Nitin'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
