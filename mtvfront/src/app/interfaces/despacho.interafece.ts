export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    despachos: Despacho[];
}


export interface Despacho {
    despacho_id: number;
    numero: string;
    descripcion: string;
    nave: string;
}