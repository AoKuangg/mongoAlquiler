import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { Router } from "express";
const appMiddlewareSucursalVerify = Router();
const SucursalMiddleware = Router();
import { Sucursal } from "../storage/controllers/sucursal.js";

appMiddlewareSucursalVerify.use((req, res, next) => {
    if (!req.rateLimit) return;
    let { payload } = req.data;
    const { iat, exp, ...newPayload } = payload;
    payload = newPayload;
    console.log(newPayload);
    let Clone = JSON.stringify(
        classToPlain(plainToClass(Sucursal, {}, { ignoreDecorators: true }))
    );
    let Verify = Clone === JSON.stringify(payload);
    !Verify
        ? res.status(406).send({ status: 406, message: "No Autorizado" })
        : next();
});

SucursalMiddleware.use(async (req, res, next) => {
    try {
        let data = plainToClass(Sucursal, req.body);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        req.data = undefined;
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
});

export { appMiddlewareSucursalVerify, SucursalMiddleware };