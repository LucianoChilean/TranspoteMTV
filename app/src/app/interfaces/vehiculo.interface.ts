export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    vehiculos: Vehiculo[];
    ramplas: Rampla[];
}

export interface Vehiculo {
    vehiculo_id:number;
    tipo_vehiculo: string;
    descripcion: string;
    year:number;
    chasis: string;
    motor:string;
    imagen:string;
    conductor_id:number;
    propietario_id:number;
    rampla_id:number;
    patente:string;

}

export interface Rampla{
    rampla_id: number;
    nombre: string;
    descripcion: string;
}