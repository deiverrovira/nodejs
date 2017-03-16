var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');
var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
/*Al agregarle Verify.verifyOrdinaryUser, se forza a que primero se verifique el user
y despues llame el callback*/
	.get(Verify.verifyOrdinaryUser, function(req,res,next){

	        Dishes.find({}, function(error, dish){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(dish);
	        });
	})

	.post(Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next){
	    	//res.body ya esta parseado en un JSON, gracias al bodyParser
	    	Dishes.create(req.body, function(error, dish){ 
	    		if(error) throw error;

	    		console.log('Dish created!');
	    		var id = dish._id;

	    		res.writeHead(200, {
	    			'Content-Type': "text-plain"
	    		});

	    		res.end('Added the dish with id : ' + id);
	    	});  
	})

	.delete(Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next){
		Dishes.remove({}, function(error, dishes){
			if(error) throw error;
			res.json(dishes);
		});
	});

	dishRouter.route('/:dishId')
		.get(function(req,res,next){

	        Dishes.findById(req.params.dishId, function (error, dish){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(dish);
	        });
		})

		.put(function(req, res, next){

			Dishes.findByIdAndUpdate(req.params.dishId, {
				$set: req.body
			}, {
				new: true
			}, function (error, dish){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(dish);
	        });
		})

		.delete(Verify.verifyOrdinaryUser, Verify.admin, function (req, res, next){
			Dishes.remove(req.params.dishId, function (error, dishes){ 
			if(error) throw error;
			res.json(dishes);
			});

		});

dishRouter.route('/:dishId/comments')
		.get(function(req,res,next){
	        Dishes.findById(req.params.dishId, function (error, dish){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(dish.comments);
	        });
		})
		.post(function(req, res, next){

			Dishes.findById(req.params.dishId, function (error, dish){
	        	if(error) throw error;
	        	dish.comments.push(req.body);

	        	dish.save(function (error, dish) {
	        	if(error) throw error;
        		console.log('Updated comments!!');
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
        		res.json(dish);
	        	});
	        });
		})

		.delete(function (req, res, next){
			Dishes.findById(req.params.dishId, function (error, dish){
			if(error) throw error;
			//Recorrer los comentarios y borrarlos
			for (var i = (dish.comments.length - 1); i >= 0; i--) {
				dish.comments.id(dish.comments[i]._id).remove();
			};

			dish.save(function (error, dish) {
	        	if(error) throw error;
        		res.writeHead(200, {
        			'Content-Type': "text/plain"
        		});
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
        		res.end('Comments deleted!!');
	        	});
			});
		});


dishRouter.route('/:dishId/comments/:commentId')
		.get(function(req,res,next){
	        Dishes.findById(req.params.dishId, function (error, dish){
	        	if(error) throw error;

	        	res.json(dish.comments.id(req.params.commentId));
	        });
		})
		.put(function(req, res, next){
			//We delete the existing comment, and insert the updated comment as a new comment 

			Dishes.findById(req.params.dishId, function (error, dish){
	        	if(error) throw error;
				dish.comments.id(req.params.commentId).remove();

	        	dish.comments.push(req.body);

	        	dish.save(function (error, dish) {
	        	if(error) throw error;
        		console.log('Updated comments!!');
        		console.log(dish);
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
        		res.json(dish);
	        	});
	        });
		})

		.delete(function (req, res, next){
			Dishes.findById(req.params.dishId, function (error, dish){
			if(error) throw error;
			dish.comments.id(req.params.commentId).remove();

			dish.save(function (error, dish) {
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
        		res.end('Comments deleted!!');
	        	});
			});
		});

module.exports = dishRouter;
