var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class Sucursal {
    // @Transform(({ value }) => { if(value) return value ; else "Faker"})
    constructor(data) {
        Object.assign(this, data);
        this.nombre = "x";
        this.direccion = "x";
        this.telefono = "x";
    }
}
__decorate([
    Expose({ name: "nombre_sucursal" }),
    IsDefined({ message: () => { throw { status: 422, message: "El nombre_sucursal es un parametro obligatorio y de tipo string" }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "direccion_sucursal" }),
    IsDefined({ message: () => { throw { status: 422, message: "La direccion_sucursal es un parametro obligatorio y de tipo string" }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "direccion", void 0);
__decorate([
    Expose({ name: "telefono_sucursal" }),
    IsDefined({ message: () => { throw { status: 422, message: "El telefono_sucursal es un parametro obligatorio y de tipo string" }; } }),
    __metadata("design:type", String)
], Sucursal.prototype, "telefono", void 0);
