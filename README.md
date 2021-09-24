# Construyendo una Api Rest

Ejemplos de envios por POST:

Para crear un usuario
* curl -X POST -H "Content-Type: application/json" -d '{"email":"ahora@email.com","contrasena":"123123","pseudonimo":"ahoraSI"}' http://localhost:8080/api/v1/autores

Para crear un publicacion con el inicio de autor
* curl -X POST -H "Content-Type: application/json" -d '{"titulo":"Italia","resumen":"Buen viaje a Italia","contenido":"Contenido"}' 'http://localhost:8080/api/v1/publicaciones?email=ahora@email.com&contrasena=123123'

Para eliminar una publicacion que pertenece a un usuario
* curl -X DELETE -H "Content-Type: application/json" 'http://localhost:8000/api/v1/publicaciones/4?email=ana@email.com&contrasena=123123'
