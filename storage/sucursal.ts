import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class Sucursal {
  @Expose({ name: "nombre_sucursal" })
  @IsDefined({ message: () => { throw { status: 422, message: "El nombre_sucursal es un parametro obligatorio y de tipo string" } } })
  nombre: string;

  @Expose({ name: "direccion_sucursal" })
  @IsDefined({ message: () => { throw { status: 422, message: "La direccion_sucursal es un parametro obligatorio y de tipo string" } } })
  direccion: string;

  @Expose({ name: "telefono_sucursal" })
  @IsDefined({ message: () => { throw { status: 422, message: "El telefono_sucursal es un parametro obligatorio y de tipo string" } } })
  telefono: string;

  // @Transform(({ value }) => { if(value) return value ; else "Faker"})
  constructor(data: Partial<Sucursal>) {
    Object.assign(this, data);
    this.nombre = "x";
    this.direccion = "x";
    this.telefono = "x";
  }
}