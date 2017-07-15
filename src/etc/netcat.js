/* netcat.js
this module control and run net cat command.
*/


'use strict';

var exec = require('child_process').exec;


/* --- Run netcat --- */
var NetCat = {

  /* Run Shell Script */
  runShellScript: function(command){
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

    /* set netcat command */
    setNetCatCommand: function(){
      /* check protocol and port
        and return part of command */
      function setProtocol(){
        
      }

      /* check how to use which server or client or portscan
        and return part of command */
      function setForServer(){

      }

      /* check using IPv4 or IPv6
        and return part of command */
      function setIPv4_OR_IPv6(){

      }

      /* check getting packet datails
        and return part of command */
      function setGettingPacketDetails(){

      }
    }
  }
}


// use for module
module.exports = NetCat;
