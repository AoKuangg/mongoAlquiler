import { Router } from "express";
import { connectDB } from "../db/conexion.js";
import { limitRequests } from "../helpers/limit.js";

const Empleado = Router();
let db = await connectDB();

Empleado.use(limitRequests);

Empleado.get("/vendedor", async (req, res) => {
  try {
    const collection = db.collection("empleado");
    const data = await collection.find({ cargo: "VENDEDOR" }).toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los empleados",
      error: error,
    });
  }
});

Empleado.get("/cargos", async (req, res) => {
  try {
    const collection = db.collection("empleado");
    const data = await collection
      .find({
        cargo: { $in: ["GERENTE", "ASISTENTE"] },
      })
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los empleados",
      error: error,
    });
  }
});

export default Empleado;
