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

- Listar todos los clientes registrados en la base de datos.
- Obtener todos los automóviles disponibles para alquiler.
- Listar todos los alquileres activos junto con los datos de los clientes relacionados.
- Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
- Obtener los detalles del alquiler con un IDAlquiler específico.
- Listar los empleados con el cargo de "Vendedor".
- Mostrar la cantidad total de automóviles disponibles en cada sucursal junto con su dirección.
- Obtener el costo total de un alquiler específico.
- Listar los clientes con el DNI específico.
- Mostrar todos los automóviles con una capacidad mayor a 5 personas.
- Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.
- Listar las reservas pendientes realizadas por un cliente específico.
- Mostrar los empleados con cargo de "Gerente" o "Asistente".
- Obtener los datos de los clientes que realizaron al menos un alquiler.
- Listar todos los automóviles ordenados por marca y modelo.
- Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.
- Obtener la cantidad total de alquileres registrados en la base de datos.
- Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
- Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.


## AUTOR

[Juan Camilo Paez Ariza](https://github.com/AoKuangg)