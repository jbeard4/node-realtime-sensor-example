var five = require("johnny-five"),
    board, sensor;

board = new five.Board();

board.on("ready", function() {

  // Create a new `sensor` hardware instance.
  sensor = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    sensor: sensor
  });

  sensor.on("read", function(err,reading) {
    //var degreesC = (this.normalized - 0.5) * 100.0;
  
    // While we're at it, let's convert degrees Celsius to Fahrenheit.
    // This is the classic C to F conversion formula:
  
    //var degreesF = degreesC * (9.0/5.0) + 32.0;
    var voltage = reading * 0.004882814;

    // For Fahrenheit
    var f = (((voltage - 0.5) * 100)*1.8) + 32;
    var c = (voltage - 0.5) * 100;
    console.log(reading,voltage,f,c);
  });

});
