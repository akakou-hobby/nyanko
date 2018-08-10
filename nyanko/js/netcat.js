var netcat = require('node-netcat')


class Client {
  constructor(option, vue) {
    this.vue = vue
    this.option = option

    var other = {
      timeout: 60000,
      read_encoding: 'buffer'
    }

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
      this.vue.output += '[note] open\n'
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
      this.client.send('', true, () => {})
    }
    else {
      this.client.close()
    }
  }
}


class Server {
  constructor(option, vue) {
    this.vue = vue
    this.option = option

    if (option.protocol == 'tcp') {
      this.server = new netcat.server(option.port, option.address)
      this.server.listen()
    }
    else {
      this.server = new netcat.udpServer(option.port, option.address)
      this.server.bind();
    }
    
    this.set_callback()
  }

  set_callback() {
    this.server.on('ready', () => {
      this.vue.output += '[note] ready\n'
    })
    if (this.option.protocol == 'tcp') {
      this.server.on('data', (client, data) => {
        this.vue.output += data
      })  
    }
    else {
      this.server.on('data', (msg, client, protocol) => {
        this.vue.output += msg + '\n'
      })  
    }
    this.server.on('client_on', (client) => {
    })
    this.server.on('client_off', (client) => {
    })
    this.server.on('error', (err) => {
      this.vue.output += err
    })
    this.server.on('close', () => {
      this.vue.output += '\n[note] close'
    })
  }

  send(message) {
    if (this.option.protocol != 'tcp'){ return }
    
    var clients = this.server.getClients()
    for (var client of clients) {
      this.server.send(client, message)
    }
  }

  close() {
    if (this.option.protocol == 'tcp') {
      var clients = this.server.getClients()
      for (var client of clients) {
        this.server.send(client, '', true)
      }
    }
    this.server.close()
  }
}

function meow(data, vue) {
  data.port = parseInt(data.port)

  if (data.mode == 'client') {
    return new Client(data, vue)
  } else {
    return new Server(data, vue)
  }
}