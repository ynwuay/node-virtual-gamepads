/*
Created by MIROOF on 04/03/2015
Virtual gamepad hub class
*/

(function() {
  var gamepad, virtual_gamepad_hub;

  gamepad = require('./virtual_gamepad');

  virtual_gamepad_hub = (function() {
    function virtual_gamepad_hub() {
      this.currentGamepad = null;
      /*var i, j;
      this.gamepads = [];
      for (i = j = 0; j <= 3; i = ++j) {
        this.gamepads[i] = void 0;
      }*/
    }

    virtual_gamepad_hub.prototype.connectGamepad = function(callback) {
      if (!this.currentGamepad) {
        this.currentGamepad = new gamepad();
        return this.currentGamepad.connect(function() {
          return callback(0);
        }, function(err) {
          return callback(-1);
        });
      }

      /*var freeSlot, padId;
      padId = 0;
      freeSlot = false;
      while (!freeSlot && padId < 4) {
        if (!this.gamepads[padId]) {
          freeSlot = true;
        } else {
          padId++;
        }
      }
      if (!freeSlot) {
        return callback(-1);
      } else {
        this.gamepads[padId] = new gamepad();
        return this.gamepads[padId].connect(function() {
          return callback(padId);
        }, function(err) {
          return callback(-1);
        });
      }*/
    };

    virtual_gamepad_hub.prototype.disconnectGamepad = function(padId, callback) {
      if (this.currentGamepad) {
        return this.currentGamepad.disconnect((function(_this) {
          return function() {
            _this.currentGamepad = null;
            return callback();
          };
        })(this));
      }
      /*if (this.gamepads[padId]) {
        return this.gamepads[padId].disconnect((function(_this) {
          return function() {
            _this.gamepads[padId] = void 0;
            return callback();
          };
        })(this));
      }*/
    };

    virtual_gamepad_hub.prototype.sendEvent = function(padId, event) {
      if (this.currentGamepad) {
        return this.currentGamepad.sendEvent(event);
      }
      /*if (this.gamepads[padId]) {
        return this.gamepads[padId].sendEvent(event);
      }*/
    };

    return virtual_gamepad_hub;

  })();

  module.exports = virtual_gamepad_hub;

}).call(this);

//# sourceMappingURL=virtual_gamepad_hub.js.map
