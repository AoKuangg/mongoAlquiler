import { Router } from "express";
import { connectDB } from "../db/conection";
import { limitRequest } from "../config/limit";
import { ObjectId } from "mongodb";

const Alquiler = Router();
let db = await connectDB();

Alquiler.use(limitRequest);

Alquiler.get("/", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "alquiler",
            localField: "DNI",
            foreignField: "ID_cliente",
            as: "Alquiler_activo",
          },
        },

        {
          $unwind: "$Alquiler_activo",
        },
        {
          $match: { "Alquiler_activo.estado": { $eq: "ACTIVO" } },
        },
        {
          $project: {
            ID_cliente: 0,
            "Alquiler_activo.ID_cliente": 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            nombre: {
              $first: "$nombre",
            },
            apellido: {
              $first: "$apellido",
            },
            DNI: {
              $first: "$DNI",
            },
            telefono: {
              $first: "$telefono",
            },
            Alquiler_activo: { $push: "$Alquiler_activo" },
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error,
    });
  }
});

Alquiler.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection.find({ _id: new ObjectId(id) }).toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error,
    });
  }
});

Alquiler.get("/fecha_inicio", async (req, res) => {
  const { fecha_inicio } = req.body;
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find({ fecha_inicio: fecha_inicio })
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

Alquiler.get("/cantidad_alquieres", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection.countDocuments().toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

Alquiler.get("/disponible/capacidad/:capacidad", async (req, res) => {
  const { capacidad } = req.params;
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "automovil",
            localField: "ID_automovil",
            foreignField: "_id",
            as: "Alquiler_Info",
          },
        },
        {
          $match: {
            estado: "DISPONIBLE",
            "Alquiler_Info.capacidad": { $gte: capacidad },
          },
        },
        {
          $project: {
            _id: 1,
            "Alquiler_Info.ID_automovil": 1,
            "Alquiler_Info.marca": 1,
            "Alquiler_Info.modelo": 1,
            "Alquiler_Info.anio": 1,
            "Alquiler_Info.tipo": 1,
            "Alquiler_Info.capacidad": 1,
            "Alquiler_Info.precio_diario": 1,
            estado: 1,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});
Alquiler.get("/fecha_inicio_rango", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find({ fecha_inicio: { $gte: "2023-07-05", $lte: "2023-07-10" } })
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

export default Alquiler;
