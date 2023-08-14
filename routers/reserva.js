import { Router } from "express";
import { connectDB } from "../db/conection.js";
import { limitRequest } from "../config/limit.js";

const Reserva = Router();
let db = await connectDB();

Reserva.use(limitRequest);

Reserva.get("/pendientes", async (req, res) => {
  try {
    const collection = db.collection("reserva");
    const data = await collection
      .aggregate([
        {
          $lookup: {
            from: "cliente",
            localField: "ID_cliente",
            foreignField: "DNI",
            as: "clientes",
          },
          $lookup: {
            from: "automovil",
            localField: "ID_automovil",
            foreignField: "_id",
            as: "automoviles",
          },
        },
        {
          $match: { estado: "PENDIENTE" },
        },
        {
          $group: {
            _id: "$_id",
            DNI_cliente: {
              $first: "$ID_cliente",
            },
            fecha_reserva: {
              $first: "$fecha_reserva",
            },
            fecha_inicio: {
              $first: "$fecha_inicio",
            },
            fecha_fin: {
              $first: "$fecha_fin",
            },
            estado: {
              $first: "$estado",
            },
            detalles_cliente: { $push: "$clientes" },
            detalles_automoviles: { $push: "$automoviles" },
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error,
    });
  }
});

Reserva.get("/pendientes/:DNI", async (req, res) => {
  const { DNI } = req.params;
  try {
    const collection = db.collection("reserva");
    const data = await collection
      .aggregate([
        {
          $match: {
            estado: "PENDIENTE",
            ID_cliente: DNI,
          },
        },
        {
          $lookup: {
            from: "cliente",
            localField: "ID_cliente",
            foreignField: "DNI",
            as: "Cliente_Info",
          },
        },
        {
          $unwind: "$Cliente_Info",
        },
        {
          $lookup: {
            from: "automovil",
            localField: "ID_automovil",
            foreignField: "_id",
            as: "Automovil_Info",
          },
        },
        {
          $unwind: "$Automovil_Info",
        },
        {
          $project: {
            "Cliente_Info._id": 0,
            "Automovil_Info._id": 0,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    es.status(500).json({
      message: "Error al listar los automoviles",
      error: error,
    });
  }
});

export default Reserva;
