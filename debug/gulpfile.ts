let gulp = require('gulp')
import { emailAdapter } from '../src/plugin'
import * as loglevel from 'loglevel'
//import { strict } from 'assert';
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;
let mailOption: any = null//{ "accessKeyId": "Enter your access key", "secretAccessKey": "ENter your access secret", "region": "enter region" };

if (!mailOption)
  mailOption = require('./mailoption.local.json') // adapt mailoption.demo.json with correct options

//the plugin will be called here
    export function sendMail (callback:any) {
      gulp.src('../testdata/mail.eml')
        .pipe(emailAdapter(mailOption))
    }

 //the roundtrip back to 

exports.default = gulp.series(sendMail)