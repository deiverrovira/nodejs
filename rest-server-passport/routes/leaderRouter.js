var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leader = require('../models/leaderShip');
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
/*Al agregarle Verify.verifyOrdinaryUser, se forza a que primero se verifique el user
y despues llame el callback*/
	.get(Verify.verifyOrdinaryUser, function(req,res,next){

	        Leader.find({}, function(error, leader){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(leader);
	        }); 
	})

	.post(Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next){
	    	//res.body ya esta parseado en un JSON, gracias al bodyParser
	    	Leader.create(req.body, function(error, leader){ 
	    		if(error) throw error;

	    		console.log('leader created!');
	    		var id = leader._id;

	    		res.writeHead(200, {
	    			'Content-Type': "text-plain"
	    		});

	    		res.end('Added the leader with id : ' + id);
	    	});  
	})

	.delete(Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next){
		Leader.remove({}, function(error, leader){
			if(error) throw error;
			res.json(leader);
		});
	});

	leaderRouter.route('/:leaderId')
		.get(function(req,res,next){

	        Leader.findById(req.params.leaderId, function (error, leader){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(leader);
	        });
		})

		.put(function(req, res, next){

			Leader.findByIdAndUpdate(req.params.leaderId, {
				$set: req.body
			}, {
				new: true
			}, function (error, leader){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(leader);
	        });
		})

		.delete(Verify.verifyOrdinaryUser, Verify.admin, function (req, res, next){
			Leader.remove(req.params.leaderId, function (error, leader){ 
				if(error) throw error;
				res.json(leader);
			});

		});

module.exports = leaderRouter;
