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
    modulo_padre: string;
    modulo_orden: number;
    padre_orden: number;
    icons: string;
    Asignacions:{
        asignacion_id: number;
    }
    asignacion_id: number;
}