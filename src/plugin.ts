var map = require('map-stream');
const getStream = require('get-stream')
var fs = require('fs');
import Vinyl = require('vinyl')
import PluginError = require('plugin-error');
require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;
import nodemailer = require('nodemailer');
var aws = require('aws-sdk');
const through2 = require('through2')
var CRLF = '\r\n'


export function sendEmails(configObj?:any) {
 
  configObj = configObj ? configObj : {};
  if(configObj==undefined)
  {
    configObj={}
  }
  aws.config = configObj
  
  function modifyContents(file: Vinyl, cb:Function) {
   if (file.isNull()) return cb(null, file); 
   if (file.isStream()) return cb(new PluginError(PLUGIN_NAME, "Streaming not supported")); // pass error if streaming is not supported

   
    /*Buffer Mode*/
    if (file.isBuffer()){
    let fileBuf : Buffer = (file.contents as Buffer)
    let rawMessage2 = fileBuf.toString('utf8')
    

      let transporter = nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01'
        })
      });
      
      var mailOptions2 = {
        envelope: {
             
         },
         raw: rawMessage2
     };

     transporter.sendMail(mailOptions2, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        })

      
      
  

  }

  }
  return map(modifyContents);
};
