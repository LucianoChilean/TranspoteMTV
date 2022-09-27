export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    modulos: Modulo[];
}

export interface Modulo {
    modulo_id:number;
    nombre: string;
    descripcion: string;

}