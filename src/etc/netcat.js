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
    setNetCatCommand: function(argument_dictionary){
      /* check host and port
        and return part of command */
      function setHostAndPort(){
        // check host or port not null
        // if host or port have null, throw error
        if(argument_dictionary.host || argument_dictionary.port){
          throw new Error('host not defined');
        }

        return argument_dictionary.host + ' ' + argument_dictionary.port;
      }

      /* check protocol and return part of command */
      function setProtocol(){
        // check which is using protocol, tcp or udp
        if(argument_dictionary.protocol == 'tcp'){
          // if choose tcp, return none
          return '';

        }else if(argument_dictionary.dictionary == 'udp'){
          // if choose udp return 'u'
          return 'u';

        }else{
          // if not choose tcp or udp, throw error
          throw new Error('not correct protocol:' + argument_dictionary.dictionary);

        }
        return argument_dictionary.protocol;
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
