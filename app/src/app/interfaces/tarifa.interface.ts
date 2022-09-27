export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    tarifas: Tarifa[];
    clientetarifa: ClienteTarifa[];
}

export interface Tarifa {
    tarifa_id:number;
    nombre: string;
    descripcion:string;
    regla:number;
    costo:number;
    estado:boolean;
    valor_interno:number;
    valor_externo:number;
}

export interface ClienteTarifa{
    clientetarifa_id:number;
    cliente_id:number;
    tarifa_id:number,
    valor:number,
    Tarifa:{
        nombre:string;
    }
    tnombre:string
}   