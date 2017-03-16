var dishes = require('./dishRouter');

function dishesApi(host,port) {
  console.log("Resolviendo llamados a servidor http con params host:  " + host + " port: " + port);

    dishes(host,port,function(err,server){
      if(err){
        console.log(err);
      }
      else{
        console.log("No hay errores en servidor: " + server.dishes());
      }
    }); 
};

dishesApi("localhost",3000);