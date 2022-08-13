export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    clientes: Cliente[];
}

export interface Cliente {
    cliente_id:number;
    nombre: string;
    rut: string;
    giro:string;
    direccion: string;

}