
var io = new Vue({
  el: "#io",
  data: {
    input: "",
    output: ""
  },
  methods: {
    submit: (message) => {
      cat.send(io.input)
      io.input = ""
    },
    close: () => {
      cat.close()
      location.href = './before.html'
    }
  }

})

var data = config.read()

var cat = meow(data, io);