/* view.js
this source program run for meow_page view*/

var view = {
  /* add output to display */
  addOutput: function(add_log){
    // add add_log to textarea
    var textarea = document.getElementById('output_textarea');
    textarea.value = textarea.value + add_log;
  }
}

module.exports = view;
