module.exports = {
	promotions:function(dishRouter){
			//here begins Promotions route ***********************************
			dishRouter.route('/promotions')
			.all(function(req,res,next) {
			      res.writeHead(200, { 'Content-Type': 'text/plain' });
			      next();
			})

			.get(function(req,res,next){
			        res.end('Will send all the promotions to you!');
			})

			.post(function(req, res, next){
			    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);    
			})

			.delete(function(req, res, next){
			        res.end('Deleting all promotions');
			});

			dishRouter.route('/promotions/:promoId')
			.all(function(req,res,next) {
			      res.writeHead(200, { 'Content-Type': 'text/plain' });
			      next();
			})

			.get(function(req,res,next){
			        res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
			})

			.put(function(req, res, next){
			        res.write('Updating the promotions: ' + req.params.promoId + '\n');
			    res.end('Will update the promotions: ' + req.body.name + 
			            ' with details: ' + req.body.description);
			})

			.post(function(req, res, next){
			    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);    
			})

			.delete(function(req, res, next){
			        res.end('Deleting promotions: ' + req.params.promoId);
			});
		}
}