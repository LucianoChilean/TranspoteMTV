export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    conductores: Conductor[];
}

export interface Conductor {
    conductor_id:number;
    nombre: string;
    paterno: string;
    materno: string;
    rut: string;
}