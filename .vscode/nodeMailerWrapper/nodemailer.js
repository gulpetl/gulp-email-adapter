var nodemailer = require('nodemailer');
var aws = require('aws-sdk');
var CRLF = '\r\n'
// configure AWS SDK
aws.config.loadFromPath('./config.json');
rawMessage = [
    'From: "Manoj Khatri" <manojkrk8@gmail.com>',
    'To: "Someone Else" <manojkrk8@gmail.com>',
    'Subject: greetings',
    'Content-Type: multipart/mixed;',
    '    boundary="_003_97DCB304C5294779BEBCFC8357FCC4D2"',
    'MIME-Version: 1.0',
    '',
    '--_003_97DCB304C5294779BEBCFC8357FCC4D2',
    'Content-Type: text/plain; charset="us-ascii"',
    'Content-Transfer-Encoding: quoted-printable',
    'Hi brozeph,',
    '',
    'I have attached a code file for you.',
    '',
    'Cheers.',
    '',
    '--_003_97DCB304C5294779BEBCFC8357FCC4D2',
    'Content-Type: text/plain; name="code.txt"',
    'Content-Description: code.txt',
    'Content-Disposition: attachment; filename="code.txt"; size=4;',
    '    creation-date="Mon, 03 Aug 2015 11:39:39 GMT";',
    '    modification-date="Mon, 03 Aug 2015 11:39:39 GMT"',
    'Content-Transfer-Encoding: base64',
    '',
    'ZWNobyBoZWxsbyB3b3JsZAo=',
    '',
    '--_003_97DCB304C5294779BEBCFC8357FCC4D2',
    ''
  ].join(CRLF);
// create Nodemailer SES transporter
function nodeMailer(){
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    }),
    sendingRate: 3 
});
console.log("in Function")
var mailOptions = {
  /*  envelope: {
        from: 'manojkrk8@gmail.com', // sender address
        to: ['manojkrk8@gmail.com']    // list of receivers
    },*/
    raw: rawMessage
};
// send some mail
/*transporter.sendMail({
    from: 'manojkrk8@gmail.com',
    to: 'manojkrk8@gmail.com',
    subject: 'Message',
    text: 'I hope this message gets sent!',
    ses: { // optional extra arguments for SendRawEmail
        
    }
});*/
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
console.log("Function gets here");
}


module.exports = nodeMailer;
