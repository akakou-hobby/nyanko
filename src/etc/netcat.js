/* netcat.js
this module control and run net cat command.
*/


'use strict';

var exec = require('child_process').exec;


/* --- Run netcat --- */
var netcat = {

  /* --- Run Shell Script --- */
  RunShellScript: function(command){
    // return with promise
    return new Promise(function(resolve, reject){
      // run command of argument
      exec(command, function(err, stdout, stderr){
        // error check
        // if err or stderr not null, reject error
        // or resolve with result
        if(err || stderr){
          reject(err);
        }
        else{
          resolve(stdout);
        }
      });
    });
  }
}


// use for module
module.exports = netcat;
