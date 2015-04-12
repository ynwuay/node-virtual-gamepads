/*
Created by MIROOF on 04/03/2015
Virtual gamepad application
*/

(function() {
  var app, config, express, gamepad_hub, http, hub, io, path, uinput;

  uinput = require('./lib/uinput');

  path = require('path');

  express = require('express');

  app = express();

  http = require('http').Server(app);

  io = require('socket.io')(http);

  config = require('./config.json');

  gamepad_hub = require('./app/virtual_gamepad_hub');

  hub = new gamepad_hub();

  app.use(express["static"](__dirname + '/public'));

  io.on('connection', function(socket) {
    socket.on('disconnect', function() {
      if (socket.gamePadId !== void 0) {
        return hub.disconnectGamepad(socket.gamePadId, function() {});
      }
    });
    socket.on('connectGamepad', function() {
      return hub.connectGamepad(function(gamePadId) {
        if (gamePadId !== -1) {
          socket.gamePadId = gamePadId;
          return socket.emit('gamepadConnected', {
            padId: gamePadId
          });
        }
      });
    });
    return socket.on('padEvent', function(data) {
      if (socket.gamePadId !== void 0 && data) {
        return hub.sendEvent(socket.gamePadId, data);
      }
    });
  });

  http.listen(config.port, function() {
    return console.info("Listening on " + config.port);
  });

}).call(this);

//# sourceMappingURL=main.js.map
