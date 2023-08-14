import dotenv from "dotenv";
import express from "express";
import Alquiler from "./routers/alquiler";
import Automovil from "./routers/automovil";
import Cliente from "./routers/cliente";
import Reserva from "./routers/reserva";
import Sucursal from "./routers/sucursal";
import Empleado from "./routers/empleado";
import { Verify_token,Generar_Token } from "./Jwt/token";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/token",Generar_Token);
app.use("/cliente",Verify_token,Cliente);
app.use("/sucursal",Verify_token,Sucursal);
app.use("/automovil",Verify_token,Automovil);
app.use("/alquiler",Verify_token,Alquiler);
app.use("/reserva",Verify_token,Reserva);
app.use("/empleado",Verify_token,Empleado);






let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});