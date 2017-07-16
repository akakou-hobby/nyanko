/* netcat.js
this source program control netcat
*/

/* Contorl Netcat */
Meow = {
  host: null,
  port: null,
  Netcat: null,
  msg: '',
  mode: null,

  /* this is constracter.
    it set host, port and netcat mode (client or server) */
  constract: function(mode, port, host='', msg=''){
    this.host = host;
    this.port = port;
    this.msg = msg;

    this.Netcat = null;
    // check client mode or server mode.
    // and make chose instrance.
    if(mode == 'client'){
      // make client mode instance
      this.Netcat = require('netcat/client');
      this.Netcat = new this.Netcat();
      this.mode = mode;

    }else if(mode == 'server'){
      // make server mode instance
      this.Netcat = require('netcat/server');
      this.Netcat = new this.Netcat();
      this.mode = mode;

    }else{
      // if mode is not correct,
      // throw error
      throw new Error('this mode is not defined :' + mode);
    }
  },

  /* connect or setup server or client */
  run: function(){
    // check client mode or server mode and setup.
    if(this.mode == 'client'){
      // start client connection
      var client = this.Netcat.addr(this.host).port(this.port).connect().on('data', this.onClientGetData);
      client.send('GET /images/json HTTP/1.0\r\n\r\n')
      //client.send
    }else if(this.mode == 'server'){
      // start server listining
      var server = this.Netcat.port(this.port).listen().on('data', this.onServerGetData);
      server.msg = this.msg;
	  }else{
      // if mode is not correct,
      // throw error
      throw new Error('this mode is not defined :' + this.mode);
    }
  },

  /* when server get request, get data and send data */
  onServerGetData: function(socket, chunk){
    // get
    console.log(chunk.toString('utf8'));
    // send
    socket.write(this.msg);
  },
  onClientGetData: function(chunk){
    console.log(chunk.toString('utf8'));
  }
}


module.exports = Meow;
