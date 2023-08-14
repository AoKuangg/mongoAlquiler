import { Router } from "express";
import { connectDB } from "../db/conection.js";
import { limitRequest } from "../config/limit.js";

const Automovil = Router();
let db = await connectDB();

Automovil.use(limitRequest);

Automovil.get("/", async (req, res) => {
  try {
    const collection = db.collection("automovil");
    const data = await collection
      .aggregate([
        {
          $match: { estado: "DISPONIBLE" },
        },
        {
          $lookup: {
            from: "automovil",
            localField: "ID_automovil",
            foreignField: "_id",
            as: "Automoviles disponibles",
          },
        },
        {
          $project: {
            ID_automovil: 0,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error.message,
    });
  }
});

Automovil.get("/capacidad", async (req, res) => {
  try {
    const collection = db.collection("automovil");
    const data = await collection.find({ capacidad: { $gte: 5 } });
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error.message,
    });
  }
});


Automovil.get("/sort", async (req, res) => {
  try {
    const collection = db.collection("automovil");
    const data = await collection.find().sort({
      marca: 1,
      modelo: -1,
    });
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error.message,
    });
  }
});

export default Automovil;
