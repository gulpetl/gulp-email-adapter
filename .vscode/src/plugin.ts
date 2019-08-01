var map = require('map-stream');
var rext = require('replace-ext');
import Vinyl = require('vinyl')
import PluginError = require('plugin-error');
require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;
import nodemailer = require('nodemailer');
var aws = require('aws-sdk');
var CRLF = '\r\n',
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
].join(CRLF); // A sample Raw message 
export function jsontoxml() {
  aws.config.loadFromPath('config.json');

// create Nodemailer SES transporter
  let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
  });
  function modifyContents(file: Vinyl, cb:Function) {
    if (file.isNull()) return cb(null, file); 
    if (file.isStream()) return cb(new PluginError(PLUGIN_NAME, "Streaming not supported")); // pass error if streaming is not supported
    let returnErr: any = null

    //Will parse the JSON into XML if the file is in
    if (file.isBuffer()){
 //   let fileBuf : Buffer = (file.contents as Buffer)
  //   let rawMessage = fileBuf.join(CRLF)
  
      // setup e-mail data with unicode symbols
     

      var mailOptions = {
         envelope: {
              
          },
          raw: rawMessage
      };
      
     

      //  try {
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
       //}
          
 //   catch(err){
  //   returnErr = new PluginError(PLUGIN_NAME, err);
 //  }

  }
    //cb(returnErr, file);
  }
  return map(modifyContents);
};
