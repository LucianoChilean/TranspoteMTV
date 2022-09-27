
export interface IDataFacturaExcel {
  clientes: Cliente[];
  tarifadetalles: TarifaDetalle[];
}

export interface Cliente {
    cliente_id:number;
    nombre: string;
    rut: string;
    giro:string;
    direccion: string;
}

export interface TarifaDetalle {
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

