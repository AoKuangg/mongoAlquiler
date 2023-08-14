import { Router } from "express";
import { connectDB } from "../db/conection.js";
import { limitRequest } from "../config/limit.js";
import { ObjectId } from "mongodb";

const Alquiler = Router();
let db = await connectDB();

Alquiler.use(limitRequest());

Alquiler.get("/", async (req, res) => {
  try {
    const collection = db.collection("cliente");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "alquiler",
            localField: "ID_cliente",
            foreignField: "DNI",
            as: "Alquiler_activo",
          },
        },
        {
          $unwind: "$Alquiler_activo",
        },
        {
          $match: { "Alquiler_activo.estado": { $eq: "Activo" } },
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
    res.status(500).json({
      message: "Error al listar los alquiler",
      error: error,
    });
  }
});

Alquiler.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection("alquiler");
    const data = await collection.find({ _id: new ObjectId(id) }).toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al listar los alquiler",
      error: error,
    });
  }
});

Alquiler.get("/fecha_inicio/:fecha_inicio", async (req, res) => {
  try {
    const  {fecha_inicio } = req.params;
    console.log(fecha_inicio);
    const collection = db.collection("alquiler");
    const data = await collection
      .find({ fecha_inicio: fecha_inicio })
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

Alquiler.get("/disponible/capacidad/:capacidad", async (req, res) => {
  const { capacidad } = req.params;
  const capacidadNumber = parseInt(capacidad)
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
            estado: "Disponible",
            "Alquiler_Info.capacidad": { $gte: capacidadNumber },
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
    res.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});
Alquiler.get("/fechaRango", async (req, res) => {
  try {
    const collection = db.collection("alquiler");
    const data = await collection
      .find({ fecha_inicio: { $gte: "2023-07-05", $lte: "2023-07-10" } })
    res.send(data);
  } catch (error) {
    res.status(500).json({
      message: "Error al listar los alquiler",
      error: error.message,
    });
  }
});

export default Alquiler;
