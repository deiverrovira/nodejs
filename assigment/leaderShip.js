module.exports = {
	leadership:function(dishRouter) {
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
}