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
      function setProtocolAndIsServer(){
        // check which is using protocol, tcp or udp
        // and check use for serevr or client
        if(argument_dictionary.protocol == 'tcp' && !argument_dictionary.is_server){
          // if choose tcp, and use for client,
          // return none
          return '';

        }else if(argument_dictionary.protocol == 'tcp' && argument_dictionary.is_server){
          // if choose tcp, and use for server,
          // return '-kvl'
          return '-kvl';

        }else if(argument_dictionary.protocol == 'udp' && !argument_dictionary.is_server){
          // if choose udp, and use for client,
          // return '-u'
          return '-u';

        }else if(argument_dictionary.protocol == 'udp' && argument_dictionary.is_server){
          // if choose udp, and use for server,
          // return '-e /bin/cat -uvl'
          return '-e /bin/cat -uvl';

        }else{
          // if not choose tcp and udp, throw error
          throw new Error(
            'not correct protocol:' + argument_dictionary.protocol
            + '\n or use for client or server ? :' + argument_dictionary.is_server
          );

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
