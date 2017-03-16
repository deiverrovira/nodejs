var http = require('http');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
	console.log(req.headers);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end('<h1>Hola Mundo</h1>');
	})
server.listen(port, hostname, function(){
		console.log('Server runnning at http://'+ hostname +':'+ port);
});