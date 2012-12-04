var five = require("johnny-five"),
    http = require('http'),
    board, sensor;

var hostname = "node-realtime-sensor-example.herokuapp.com",
    port = 80;

//var hostname = 'localhost',
//    port = 1337,

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

    //send a POST
    var options = {
      hostname: hostname,
      port: port,
      path: '/sensor',
      method: 'POST'
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(JSON.stringify(f));
    req.end();

  });

});
