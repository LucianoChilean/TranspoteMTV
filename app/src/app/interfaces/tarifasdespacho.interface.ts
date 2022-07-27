export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    tarifadespachos: Tarifadespacho[];
}

export interface Tarifadespacho {
    tarifadespacho_id:number;
    despacho_id:number;
    Tarifa: {
        nombre:string,
        valor_externo:number
    };
}