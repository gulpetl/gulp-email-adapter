let gulp = require('gulp')
import {jsontoxml} from '../src/plugin'
import {xmltojson} from 'gulp-xmltojson'
import * as loglevel from 'loglevel'
//import { strict } from 'assert';
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)
var options = {compact: true, spaces: 4};
var options2 = {compact:true};
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the plugin will be called here
    export function xml (callback:any) {
      gulp.src('../testdata/*.json')
        .pipe(jsontoxml(options))
        .on('data', function (file:any) {
          console.log('Done creating ' + file.basename)
      }) 
        .pipe(gulp.dest('../testdata/processed'))
        callback();
    }

 //the roundtrip back to 
 export function json(callback: any) {
  gulp.src('../testdata/processed/*.xml')
  .pipe(xmltojson(options2))
  .on('data', function (file:any) {
    console.log('Done creating ' + file.basename)
})  
  .pipe(gulp.dest('../testdata/processed/round trip'))
 .on('end', function () {
    log.info('gulp task complete')
  })
  callback();
};   
    

exports.default = gulp.series(xml,json)