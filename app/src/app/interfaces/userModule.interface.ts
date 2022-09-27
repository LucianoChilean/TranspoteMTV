export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    usermodule: UserModule[];
}

export interface UserModule {
    modulo_id:number;
    asignacion_id:number;
    Modulo:{
        nombre:string,
        descripcion:string,
        modulo_padre:string,
        icons:string,
    };
    nombre_modulo:string;
    descrip_modulo:string;
    padre:string;
    icons:string;
    
    
}