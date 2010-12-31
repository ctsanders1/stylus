
/**
 * Module dependencies.
 */

var css = require('../../')
  , should = require('../../support/should')
  , basename = require('path').basename
  , fs = require('fs');

/**
 * Test the given `test`.
 *
 * @param {String} test
 */

function test(test) {
  if ('functions.defaults' == test || 'scope.complex' == test) return;
  var base = __dirname + '/tests/' + test
    , path =  base + '.in'
    , csspath = base + '.css';
  fs.readFile(path, 'utf8', function(err, str){
    if (err) throw err;
    var paths = [__dirname + '/tests', __dirname + '/tests/import'];
    css.render(str, { filename: path, paths: paths }, function(err, actual){
      if (err) throw err;
      fs.readFile(csspath, 'utf8', function(err, expected){
        if (err) throw err;
        if (actual != expected) {
          var msg = '"' + basename(path, '.in') + '" failed\n\n'
            + 'expected: \n' + expected + '\n\n'
            + 'actual: \n' + actual + '\n';
          throw new Error(msg);
        }
      });
    });
  });
  return test;
};

/**
 * Auto-load and run tests.
 */

fs.readdir(__dirname + '/tests', function(err, files){
  if (err) throw err;
  files.forEach(function(file){
    if (/\.in$/.test(file)) {
      test(basename(file, '.in'));
    }
  });
});