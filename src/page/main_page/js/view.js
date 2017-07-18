/* view.js
this source program run for main_page view */


var view = {
  /* check setup complete ,
    and turn on button. */
  trunButton: function(){
    // get element
    var server_radio = document.getElementById('server_radio');
    var client_radio = document.getElementById('client_radio');
    var udp_radio = document.getElementById('udp_radio');
    var tcp_radio = document.getElementById('tcp_radio');
    var port_text = document.getElementById('port_text');

    // if setup complete,
    // meow button turn on(make it blue)
    if((server_radio.checked || client_radio.checked) && (udp_radio.checked || tcp_radio.checked) && (port_text.value)){
      // get element
      var meow_button = document.getElementById('meow_button');
      // remove btn-light
      meow_button.classList = ['btn'];
      // turn on canMeow of state
      state.canMeow = true;
    }
  },

  /* get elements state and set `state` */
  setState: function(){
    // set message of message_textarea
    state.message = document.getElementById('message_textarea').value;
    state.host = document.getElementById('host_text').value;
    state.port = document.getElementById('port_text').value;


    // get elements
    var is_server_radio = document.getElementById('server_radio').checked;
    var use_udp = document.getElementById('udp_radio').checked;

    // set to 'server' or 'client' to state.server_client
    if(is_server_radio){
      state.server_client = 'server';

    }else{
      state.server_client = 'client';
    }

    // set to 'udp' or 'tcp' to state.udp_tcp
    if(use_udp){
      state.udp_tcp = 'udp';

    }else{
      state.udp_tcp = 'tcp';
    }
  },

  /* use template */
  useTemplate: function(){
    // get template
    var fs = require('fs');
    var selecter = document.getElementById('selecter');
    fs.readFile('./template/' + selecter.value, 'utf8', function (err, text) {
      // check and throw err
      if(err){
        throw err;
      }

      // get text area
      var textarea = document.getElementById('message_textarea');
      textarea.value = text + textarea.value;
    });
  },

  /* get and set file templates */
  getTemplate: function(){
    var fs = require('fs');
    // get file directries
    fs.readdir('./template', function(err, files){
      // check and throw err
      if (err){
        throw err;
      }

      // set selecter to files
      var selecter = document.getElementById('selecter');
      var tag = '<option> not use template </option>\n';

      for(name of files){
        tag += ' <option> ' + name + ' </option> \n';
      }

      selecter.innerHTML = tag;
    });
  }
}

module.exports = view;
