export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    clientes: Cliente[];
    direcciones: Direccion[];
}

export interface Cliente {
    cliente_id:number;
    nombre: string;
    rut: string;
    giro:string;
    direccion: string;

}

export interface Direccion{
    direccion_id:number;
    direccion:string;
    descripcion:string;
    region_id:number;
    comuna_id:number;
    Region:{
        nombre:string;
    }
    rnombre:string;
    Comuna:{
        nombre:string;
    }
    ccomuna: string;
}