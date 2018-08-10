var mode = new Vue({
  el: '#mode',
  data: {
    picked: null,
  }
})

var protocol = new Vue({
  el: "#protocol",
  data: {
    picked: null
  }
})

var network = new Vue({
  el: "#network",
  data: {
    port: "",
    address: ""
  }
})

function submit() {
  if (mode.picked == null) {
    return
  }
  if (protocol.picked == null) {
    return
  }
  if (network.address == "" || network.port == "") {
    return
  }

  config.write({
    mode: mode.picked,
    protocol: protocol.picked,
    address: network.address,
    port: network.port
  })

  location.href = './after.html'
}
