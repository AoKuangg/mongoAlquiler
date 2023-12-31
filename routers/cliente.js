import { Router } from "express";
import { connectDB } from "../db/conection.js";
import { limitRequest } from "../config/limit.js";

const Cliente = Router();
let db = await connectDB();

Cliente.use(limitRequest());

Cliente.get("/", async (req, res) => {
  try {
    const collection = db.collection("cliente");
    const data = await collection.find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al listar los clientes",
      error: error,
    });
  }
});

Cliente.get("/:dni", async (req, res) => {
  const { dni } = req.params;
  const dninumero = parseInt(dni)
  console.log(dni);
  try {
    const collection = db.collection("cliente");
    const data = await collection.find({ DNI: dninumero }).toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al listar los clientes",
      error: error,
    });
  }
});

Cliente.get("/", async (req, res) => {
  try {
    const collection = db.collection("cliente");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "alquiler",
            localField: "DNI",
            foreignField: "ID_cliente",
            as: "alquiler_info",
          },
        },
        {
          $match: { alquiler_info: { $ne: [] } },
        },
        {
          $project: {
            "alquiler_info.ID_cliente": 0,
            "alquiler_info.ID_automovil": 0,
            "alquiler_info.fecha_inicio": 0,
            "alquiler_info.fecha_fin": 0,
          },
        },
        {
          $group: {
            _id: "$DNI",
            nombre: { $first: "$nombre" },
            apellido: { $first: "$apellido" },
            telefono: { $first: "$telefono" },
            email: { $first: "$email" },
            alguiler_info: {
              $push: "$alquiler_info",
            },
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al listar los clientes",
      error: error,
    });
  }
});

export default Cliente;
