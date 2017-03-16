//Se expone un modulo con variables globales para ser usadas en nuestra app
module.exports = {
	'secretKey'	: '12345-67890-09876-54321',
	'mongoUrl'	: 'mongodb://localhost:27017/conFusion',

	//configuracion para OAuth facebook authentication
    'facebook': {
        clientID: '1705719636392922',
        clientSecret: '828387187cdcdd05f551a7e46a519050',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}