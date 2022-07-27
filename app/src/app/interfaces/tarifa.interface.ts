export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    tarifas: Tarifa[];
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