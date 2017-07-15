/* event.js
this source program is called when nynko have event */

/* when change selected radio button, called */
function onChangeRadioButton(){
  view.trunButton();
}

/* when push meow button, called */
function onPushedButton(){
  if(state.canMeow == true){
    alert('meow');
  }
}
