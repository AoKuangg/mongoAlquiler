import dotenv from "dotenv";
import express from "express";
import Alquiler from "./routers/alquiler.js";
import Automovil from "./routers/automovil.js";
import Cliente from "./routers/cliente.js";
import Reserva from "./routers/reserva.js";
import Sucursal from "./routers/sucursal.js";
import Empleado from "./routers/empleado.js";
import { appToken,appVerify } from "./Jwt/token.js"
dotenv.config();

const app = express();
app.use(express.json());

app.use("/token",appToken);
app.use("/cliente",appVerify,Cliente);
app.use("/sucursal",appVerify,Sucursal);
app.use("/automovil",appVerify,Automovil);
app.use("/alquiler",appVerify,Alquiler);
app.use("/reserva",appVerify,Reserva);
app.use("/empleado",appVerify,Empleado);






let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});