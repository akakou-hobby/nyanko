var netcat = require('node-netcat')


class Client {
  constructor(option, vue) {
    this.vue = vue
    this.option = option

    var other = {
      timeout: 60000,
      read_encoding: 'buffer'
    }

    console.log(option.protocol)
    if (option.protocol == 'tcp') {
      this.client = new netcat.client(option.port, option.address, other)
    }
    else {
      this.client = new netcat.udpClient(option.port, option.address, other)
    }
    
    this.set_callback()
    this.client.start()  
  }

  set_callback() {
    this.client.on('open', () => {
      this.vue.output += "[note] open\n"
    })
  
    this.client.on('data', (data, network=null, protocol_family=null) => {
      this.vue.output += data
    })
  
    this.client.on('err', (err) => {
      this.vue.output += err
    })
  
    this.client.on('close', () => {
      this.vue.output += '\n[note] close'
    })
  }

  send(message) {
    if (this.option.protocol == 'tcp') {
      message += '\n';
      this.client.send(message, false, () => {})
    }
    else {
      this.client.send(message)
    }
  }

  close() {
    if (this.option.protocol == 'tcp') {
      this.client.send("", true, () => {})
    }
    else {
      this.client.close()
    }
  }
}

function meow(data, vue) {
  data.port = parseInt(data.port)

  if (data.mode == 'client') {
    return new Client(data, vue)
  }
}