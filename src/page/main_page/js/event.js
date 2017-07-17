/* event.js
this source program is called when nynko have event */

var view = require('./js/view');
var state = require('./js/state')

/* when change selected radio button, called */
function onChangeRadioButton(){
  view.trunButton();
}

/* when push meow button, called */
function onPushedButton(){
  if(state.canMeow == true){
    view.setState();

    var fs = require('fs');
    fs.writeFile('.swp', JSON.stringify(state, null, '    ') , function (err) {
      if(err){
        throw err;
      }
      location.href = '../meow_page/index.html';

    });
  }
}

/* when chenge selecter selected, called */
function onChangeSelecter(){
  console.log('hoeg')
  view.useTemplate();
}
