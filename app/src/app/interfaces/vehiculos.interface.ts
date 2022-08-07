export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    vehiculos: Vehiculo[];
}

export interface Vehiculo {
    vehiculos_id: number
    patente: string;
    rampla_id: number;
    descripcion: string;
    tipo_vehiculo: string;
    conductor_id: number;
    propietario_rut: string;
    fecha: string;
    chasis: string;
    motor: string;
    imagen: string;
}