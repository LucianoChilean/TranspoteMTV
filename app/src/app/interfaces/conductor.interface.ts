export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    conductores: Conductor[];
}

export interface Conductor {
    conductor_id:number;
    nombre_completo:string;
    nombre: string;
    paterno: string;
    materno: string;
    email:string;
    rut: string;
    fono:number;
    tipo:string;
    giro:string;
    imagen:string;
}