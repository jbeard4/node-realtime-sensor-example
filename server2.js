var http = require('http');

var currentTemperature;

http.createServer(function (req, res) {
    if(req.url !== '/sensor') {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Resource not found\n');
        return;
    }

    if(req.method === 'POST'){
        var data = '';
        req.on('data',function(s){
            data += s; 
        });
        req.on('end',function(){
            currentTemperature = JSON.parse(data);

            console.log('updated temperature to',currentTemperature);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(currentTemperature));
        });
    }else{
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(currentTemperature));
    }

}).listen(1337);
console.log('Server running at 1337');
