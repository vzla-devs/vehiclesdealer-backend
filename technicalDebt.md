* en el servicesController, se ha tenido que sustituir:
dealer/application/queries/GetDealerServicesQuery -> vehicles/application/getServicesQuery.getAll()
dealer/application/actions/AddDealerServiceAction -> vehicles/application/addServiceAction

debido a que actualmente los servicios están definidos con un esquema de Mongoose, intentar usar la query y la acción nuevas causa un error, una solución a esto puede ser quitar el uso del esquema para los servicios por completo.