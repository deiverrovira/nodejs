var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
//Verify encapsula el manejo de JWT y verificando la identidad de los usuarios
var Verify = require ('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.admin, function(req, res, next) {
		User.find({}, function(error, user){
	        	if(error) throw error;
	        	//Response que va a convertir la respuesta como un json, no es necesario pasar los headers ni el status 200
	        	//se convierte automaticamente con este metodo
	        	res.json(user);
	        });
});

/*El usuario se recibe desde el body del request, gracias al bodyParser
Este router esta sobre la ruta /users, de tal manera que este post
estara escuchando las peticiones a /users/register */
router.post('/register', function (req, res) {
	User.register(new User({ username : req.body.username }),
		req.body.password, function (error, user) {
			if (error) {
				return res.status(500).json({error : error});
			}
				
			passport.authenticate('local')(req, res, function () {
				return res.status(200).json({status : 'Registration successful'});
			});
		});
});
/*/users/login
*/
router.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info){
		if (err) {
				return next(err);
			}
			//Si el user es valido, la vble user no es null,
			if(!user){
				return res.status(401).json({
					err: info
				});
			}
			//En este punto passport ya intentó de autenticar el usuario,
			// ahora voy a hacer el logIn gracias a passport
			req.logIn(user, function (error) {
				if (error) {
					return res.status(500).json({error : 'Could not log in User model'
					});
				}

				console.log('User in users', user);

				//Me retorna un token de mi usuario válido
				var token = Verify.getToken(user);

				res.status(200).json({
					status: 'Login successful',
					succes: true,
					token: token
				});
			});
	})(req,res,next);
});


router.get('/logout', function(req, res) {
	//Al hacer logout, se destruye el token
	req.logout();
	res.status(200).json({
		status: 'Bye!'
	});
});

module.exports = router;
