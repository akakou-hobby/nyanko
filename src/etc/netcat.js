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
  },
  /* set netcat command */
  setNetCatCommand: function(argument_dictionary){
    /* check host and port
      and return part of command */
    function setHostAndPort(){
      // check host or port not null
      // if host or port have null, throw error
      if(!argument_dictionary.host || !argument_dictionary.port){
        throw new Error('host or port not defined');
      }

      return argument_dictionary.host + ' ' + argument_dictionary.port;
    }

    /* check protocol and use for server or client
      and return part of command */
    function setProtocolAndUseForServer(){
      // check which is using protocol, tcp or udp
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

    /* check using IPv4 or IPv6
      and return part of command */
    function setIPv4_OR_IPv6(){
      // check using IPv4 or IPv6
      if(argument_dictionary.ip_version == 4){
        // if use IPv4, return '-4'
        return '-4';

      }else if(argument_dictionary.ip_version == 6){
        // if use IPv6, retunr '-6'
        return '-6';

      }else{
        // if not use IPv4 and IPv6, throw error
        throw new Error(
          'not correct ip version:' + argument_dictionary.ip_version
        );
      }
    }

    /* check getting packet datails
      and return part of command */
    function setGettingPacketDetails(){
      // check getting packet datails
      if(argument_dictionary.get_datails){
        return '';
      }else{
        return '-v';
      }
    }

    /* -- main script
      make command and return command -- */
    var nc_command = 'nc '+ setProtocolAndUseForServer() + ' ' + setIPv4_OR_IPv6()
      + setGettingPacketDetails()  + ' ' + setHostAndPort()

    return nc_command;
  }
}



// use for module
module.exports = NetCat;
