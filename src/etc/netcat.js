/* netcat.js
this source program control netcat
*/
var escape = require("html-escape");

/* Contorl Netcat */
Meow = {
  host: null,
  port: null,
  Netcat: null,
  msg: '',
  mode: null,
  tcp_udp: null,

  /* this is constracter.
    it set host, port and netcat mode (client or server) */
  constract: function(output, mode, tcp_udp, port, host='', msg=''){
    this.output = output;
    this.host = host;
    this.port = parseInt(port);
    this.msg = msg;
    this.tcp_udp = tcp_udp;

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
      throw new Error('this mode is not defined :' + this.mode);
    }
  },

  /* connect or setup server or client */
  run: function(){
    // check client mode or server mode and setup.
    if(this.mode == 'client'){
      if(this.tcp_udp == 'tcp'){
        // start client connection
        // tcp client
        var client = this.Netcat.addr(this.host)
          .port(this.port)
          .connect()
          .on('data', this.onTCPClientGetData)
          .send(this.msg);
      }else if(this.tcp_udp == 'udp'){
        // udp client
        var client = this.Netcat.udp()
          .port(this.port)
          .wait(1000)
          .init()
          .on('data', this.onUDPClientGetData)
          .send(this.msg, this.host);

      }else{
        // if transport layer is not correct,
        // throw error
        throw new Error('this transport layer is not defined :' + this.tcp_udp);
      }

      // set output function
      client.output = this.output;

    }else if(this.mode == 'server'){
      // start server listining
      var server = this.Netcat.port(this.port).listen().on('data', this.onTCPServerGetData);
      server.output = this.output;
      server.msg = this.msg;
	  }else{
      // if mode is not correct,
      // throw error
      throw new Error('this mode is not defined :' + this.mode);
    }
  },

  /* when server get tcp request, get data and send data */
  onTCPServerGetData: function(socket, chunk){
    // escape
    chunk = escape(chunk);
    // get
    this.output(chunk.toString('utf8'));
    // send
    socket.write(this.msg);
  },

  /* when client get tcp response, get data and send data */
  onTCPClientGetData: function(chunk){
    // escape
    chunk = escape(chunk);
    // get
    this.output(chunk.toString('utf8'));
  },

  /* when server get udp request, get data and send data */
  onUDPServerGetData: function(socket, chunk){
    // escape
    chunk = escape(chunk);
    // get
    this.output(chunk.toString('utf8'));
    // send
    socket.write(this.msg);
  },

  /* when client get udp response, get data and send data */
  onUDPClientGetData: function(chunk){
    // escape
    chunk = escape(chunk.data);
    // send
    this.output(chunk.toString('utf8'));
  }
}


module.exports = Meow;
