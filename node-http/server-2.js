var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
	console.log('Request from ' + req.url + ' by method ' + req.method);

	if(req.method=='GET'){

		var fileurl;
		if(req.url == '/') fileurl = '/index.html';
		else fileurl = req.url;

		var filePath = path.resolve('./public'+fileurl);

		var fileExt = path.extname(filePath);

		if(fileExt == '.html'){
			fs.exists(filePath, function(exists) {

				if(!exists){
					res.writeHead(404, {'Content-Type' : 'text/html'});
					res.end('<h1>Error 404: ' + fileurl +' does not exist</h1>');
					return;
				}
					res.writeHead(200, {'Content-Type' : 'text/html'});
					fs.createReadStream(filePath).pipe(res);
			});			
		}
		else{
			res.writeHead(404, {'Content-Type' : 'text/html'});
			res.end('<h1>Error 404: ' + fileurl +' Not a HTML file</h1>');
			return;
		}		
	}
	else{
			res.writeHead(400, {'Content-Type' : 'text/html'});
			res.end('<h1>Error 400: Bad request cause we dont support otrhe method than GET</h1>');
			return;
		}	
})
server.listen(port, hostname, function(){
		console.log('Server runnning at http://'+ hostname +':'+ port);
});