var ioServer = require('socket.io');
var ioClient = require('socket.io-client');
module.exports = {
  addon: {
    cmd: 'discord',
    autocomplete: ['args'],
    args: ['create', 'join', 'stop'],
    usage: 'discord <host | join | stop> <port>',
    description: 'mineflayer-discord server setup',
    useLanguageFile: true,
    handler: async function(sender, args) {
      let lang = this.lang;

      if(args[0] === 'host') {
          // Create Socket Server
          // server.js:
          var SocketServer = ioServer({});
          await SocketServer.listen(3000);
          console.log(SocketServer)
          SocketServer.on('connection', function (socket) {
              console.log('connected:', socket.client.id);
              socket.on('serverEvent', function (data) {
                  console.log('new message from client:', data);
              });
              setInterval(function () {
                  socket.emit('clientEvent', Math.random());
                  console.log('message sent to the clients');
              }, 3000);
          });
          SocketServer.httpServer.on('listening', function () {
            console.log('listening on port', SocketServer.httpServer.address().port)
          })
          SocketServer.httpServer.on('close', function () {
            console.log('conn closed')
          })
      }

      if(args[0] === 'join') {
         // Join Socket Server (Check if this process is hosting aswell)
         var socket = ioClient.connect("http://localhost:3000/", {
              reconnection: true
          });

          socket.on('connect', function () {
              console.log('connected to localhost:3000');
              socket.on('clientEvent', function (data) {
                  console.log('message from the server:', data);
                  socket.emit('serverEvent', "thanks server! for sending '" + data + "'");
              });
          });
      }

      if(args[0] === 'stop') {

      }

      
    }
  }
};