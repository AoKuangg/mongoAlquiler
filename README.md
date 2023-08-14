# Alquiler de Autos
En este proyecto se realiza el filtro de alquiler de autos campus pero esta vez la base de datos se encuentra en mongodb.

### Base de datos

En laa creación de la base de datos, recuerda siempre usar el USE de la DB en cada consulta y creación de colecciones.

```bash
use("db_alquiler_mongo")
```

Ejemplo de las colecciones creadas para la práctica.

1. **sucursal:**
2. **automovil:**
3. **sucursal_automovil:**
4. **cliente:**
5. **alquiler:**
6. **reserva:**
7. **empleado:**
8. **registro_devolucion:**

### Consultas de el proyecto

- _Listar todos los clientes registrados en la base de datos._
- _Obtener todos los automóviles disponibles para alquiler._
- _Listar todos los alquileres activos junto con los datos de los clientes relacionados._
- _Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado._
- _Obtener los detalles del alquiler con un ID_Alquiler específico._
- _Listar los empleados con el cargo de "Vendedor"._
- _Mostrar la cantidad total de automóviles disponibles en cada sucursal junto con su dirección._
- _Obtener el costo total de un alquiler específico._
- _Listar los clientes con el DNI específico._
- _Mostrar todos los automóviles con una capacidad mayor a 5 personas._
- _Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'._
- _Listar las reservas pendientes realizadas por un cliente específico._
- _Mostrar los empleados con cargo de "Gerente" o "Asistente"._
- _Obtener los datos de los clientes que realizaron al menos un alquiler._
- _Listar todos los automóviles ordenados por marca y modelo._
- _Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección._
- _Obtener la cantidad total de alquileres registrados en la base de datos._
- _Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles._
- _Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'._