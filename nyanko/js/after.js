
var io = new Vue({
  el: "#io",
  data: {
    input: "",
    output: ""
  },
  methods: {
    submit: (message) => {
      _client.send(io.input)
      io.input = ""
    },
    close: () => {
      _client.close()
      location.href = './before.html'
    }
  }

})

var data = config.read()

var _client = meow(data, io);