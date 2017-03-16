//Se van a crear dos usuarios, 1 admin y otro usuario regular
task 1 - crear una funcion dentro de verify.js para validar si el usuario es admin o no

//Para actualizar el campo admin a true para el usuario deiver
db.users.update({username:"deiver"},{$set: {admin:true}})

Assigment3 - task1
//Para obtener los datos de un usuario apartir del token, se debe 1. decodificar el token con verify.decode y guardarlo en el requests, a partir de ahi, ahi una variable "_doc" la cual almacena los atributos (nombre, contraseña, rol, etc) del documento en Mongodb

Task 2
Restringir el las solicitudes de POST, DELETE para dishes, leadership y promotions,
esto se logra adicionando otro middleware en el momento de invocar el router

Task 3
Consultar los usuarios para los usuarios admin
100% done