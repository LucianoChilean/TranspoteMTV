export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    tarifadespachos: Tarifadespacho[];
    tarifadetalles: TarifaDetalle[];
}

export interface Tarifadespacho {
    tarifadespacho_id:number;
    despacho_id:number;
    Tarifa: {
        nombre:string,
        valor_externo:number
    };
}

export interface TarifaDetalle{
    tarifadetalle_id:number;
    Tarifa:{
        nombre:string,
        valor_externo:number,
        valor_interno:number
    };
    tnombre:string;
    tvalore:number;
    tvalori:number;
}