import { PatternValidator } from "@angular/forms";

export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    despachos: Despacho[];
}


export interface Despacho {
    despacho_id: number;
    numero: string;
    descripcion: string;
    nave: string;
    estado: string;
    Puerto: {
        puerto_id:number,
        nombre:string
    };
    Puertonombre:string;
    conductor:{
        conductor_id:number,
        nombre:string,
        paterno:string,
        materno:string
     };
    cname:string;
    Cliente:{
        cliente_id:number;
        nombre:string
     };
    cliname:string;

}