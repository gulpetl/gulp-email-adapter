let gulp = require('gulp')
import {jsontoxml} from '../src/plugin'
import * as loglevel from 'loglevel'
//import { strict } from 'assert';
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;


//the plugin will be called here
    export function xml (callback:any) {
      gulp.src('../testdata/testB.eml')
        .pipe(jsontoxml())
    }

 //the roundtrip back to 

exports.default = gulp.series(xml)