var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promos = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
/*Al agregarle Verify.verifyOrdinaryUser, se forza a que primero se verifique el user
y despues llame el callback*/
	.get(Verify.verifyOrdinaryUser, function(req,res,next){

	        Promos.find({}, function(error, promo){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(promo);
	        }); 
	})

	.post(Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next){
	    	//res.body ya esta parseado en un JSON, gracias al bodyParser
	    	Promos.create(req.body, function(error, promo){ 
	    		if(error) throw error;

	    		console.log('promo created!');
	    		var id = promo._id;

	    		res.writeHead(200, {
	    			'Content-Type': "text-plain"
	    		});

	    		res.end('Added the promo with id : ' + id);
	    	});  
	})

	.delete(Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next){
		Promos.remove({}, function(error, promos){
			if(error) throw error;
			res.json(promos);
		});
	});

	promoRouter.route('/:promoId')
		.get(function(req,res,next){

	        Promos.findById(req.params.promoId, function (error, promo){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(promo);
	        });
		})

		.put(function(req, res, next){

			Promos.findByIdAndUpdate(req.params.promoId, {
				$set: req.body
			}, {
				new: true
			}, function (error, promo){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(promo);
	        });
		})

		.delete(Verify.verifyOrdinaryUser, Verify.admin, function (req, res, next){
			Promos.remove(req.params.promoId, function (error, promos){ 
				if(error) throw error;
				res.json(promos);
			});

		});

module.exports = promoRouter;
