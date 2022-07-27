export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    detalles: Detalle[];
}


export interface Detalle {
    detalle_id: number;
    descripcion: string;
    tipo: string;
    peso: string;
    fecha_retiro: string;
    tarjeton: string;
    fecha_entrega: string;
    Puerto: {
        nombre:string 
    };
    pname:string;
    Direccion:{
        direccion:string,
     };
    dname:string;
 
}