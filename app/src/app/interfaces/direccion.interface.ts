export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    direcciones: Direccion[];
}


export interface Direccion {
    direccion_id: number;
    direccion: string;
    descripcion: string;
}