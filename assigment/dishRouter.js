var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderShip');

module.exports = function(host,port,callback) {
	try {
		if(host == null || port == null) {
			throw new Error ("The host and port are mandatory");
		}
		else 
			callback(null, {
				dishes:function() {

					var express = require('express');
					var morgan = require('morgan');
					var bodyParser = require('body-parser');
					var app = express();

					app.use(morgan('dev'));

					var dishRouter = express.Router();

					dishRouter.use(bodyParser.json());

					dishesRouter(dishRouter);		
					promoRouter.promotions(dishRouter);
					leaderRouter.leadership(dishRouter);

					app.use('/',dishRouter);

					app.use(express.static(__dirname + '/public'));

					app.listen(port, host, function(){
					  console.log(`Server running at http://${host}:${port}/`);
					});
				}
			});
		}
	catch (error) {
		callback(error,null);
	}
}

function dishesRouter(dishRouter) {

					dishRouter.route('/dishes')
					.all(function(req,res,next) {
					      res.writeHead(200, { 'Content-Type': 'text/plain' });
					      next();
					})

					.get(function(req,res,next){
					        res.end('Will send all the dishes to you!');
					})

					.post(function(req, res, next){
					    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
					})

					.delete(function(req, res, next){
					        res.end('Deleting all dishes');
					});

					dishRouter.route('/dishes/:dishId')
					.all(function(req,res,next) {
					      res.writeHead(200, { 'Content-Type': 'text/plain' });
					      next();
					})

					.get(function(req,res,next){
					        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
					})

					.put(function(req, res, next){
					        res.write('Updating the dish: ' + req.params.dishId + '\n');
					    res.end('Will update the dish: ' + req.body.name + 
					            ' with details: ' + req.body.description);
					})

					.post(function(req, res, next){
					    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
					})

					.delete(function(req, res, next){
					        res.end('Deleting dish: ' + req.params.dishId);
					});

}

function leaderShipRouter (dishRouter) {
	//here begins leaderShip route ***********************************
	dishRouter.route('/leaderShip')
	.all(function(req,res,next) {
	      res.writeHead(200, { 'Content-Type': 'text/plain' });
	      next();
	})

	.get(function(req,res,next){
	        res.end('Will send all the leaderShip to you!');
	})

	.post(function(req, res, next){
	    res.end('Will add the leaderShip: ' + req.body.name + ' with details: ' + req.body.description);    
	})

	.delete(function(req, res, next){
	        res.end('Deleting all leaderShip');
	});

	dishRouter.route('/leaderShip/:leaderId')
	.all(function(req,res,next) {
	      res.writeHead(200, { 'Content-Type': 'text/plain' });
	      next();
	})

	.get(function(req,res,next){
	        res.end('Will send details of the leaderShip: ' + req.params.leaderId +' to you!');
	})

	.put(function(req, res, next){
	        res.write('Updating the leaderShip: ' + req.params.leaderId + '\n');
	    res.end('Will update the leaderShip: ' + req.body.name + 
	            ' with details: ' + req.body.description);
	})

	.post(function(req, res, next){
	    res.end('Will add the leaderShip: ' + req.body.name + ' with details: ' + req.body.description);    
	})

	.delete(function(req, res, next){
	        res.end('Deleting leaderShip: ' + req.params.leaderId);
	});

}

function genericRouter(dishRouter, url ) {

					dishRouter.route('/' + url)
					.all(function(req,res,next) {
					      res.writeHead(200, { 'Content-Type': 'text/plain' });
					      next();
					})

					.get(function(req,res,next){
					        res.end('Will send all the ' + url + ' to you!');
					})

					.post(function(req, res, next){
					    res.end('Will add the ' + url + ' : ' + req.body.name + ' with details: ' + req.body.description);    
					})

					.delete(function(req, res, next){
					        res.end('Deleting all ' + url + '.');
					});

					dishRouter.route('/'+url+'/:dishId')
					.all(function(req,res,next) {
					      res.writeHead(200, { 'Content-Type': 'text/plain' });
					      next();
					})

					.get(function(req,res,next){
					        res.end('Will send details of the ' + url + ': ' + req.params.dishId +' to you!');
					})

					.put(function(req, res, next){
					        res.write('Updating the ' + url + ': ' + req.params.dishId + '\n');
					    res.end('Will update the ' + url + ': ' + req.body.name + 
					            ' with details: ' + req.body.description);
					})

					.post(function(req, res, next){
					    res.end('Will add the ' + url + ': ' + req.body.name + ' with details: ' + req.body.description);    
					})

					.delete(function(req, res, next){
					        res.end('Deleting ' + url + ': ' + req.params.dishId);
					});

}