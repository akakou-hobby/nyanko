/* view.js
this source program run for view*/


/* check setup complete ,
  and turn on button. */
function trunButton(){
  // get element
  var server_radio = document.getElementById('server_radio');
  var client_radio = document.getElementById('client_radio');
  var udp_radio = document.getElementById('udp_radio');
  var tcp_radio = document.getElementById('tcp_radio');

  // if setup complete,
  // meow button turn on(make it blue)
  if(server_radio.checked || client_radio.checked && udp_radio.checked || tcp_radio.checked){
    // get element
    var meow_button = document.getElementById('meow_button');
    // remove btn-light
    meow_button.classList = ['btn'];
  }
}
