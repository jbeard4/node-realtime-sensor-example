var five = require("johnny-five"),
    board, led;

board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  led = new five.Led({
    pin: 13
  });

  // "on" turns the led _on_
  led.on();

  var on = true;

  function poll() {
    on = !on;
    on ? led.on() : led.off();

    self.wait( 3000, poll);
  }

  var self = this;

  // Turn the led back on after 3 seconds (shown in ms)
  poll();
});

