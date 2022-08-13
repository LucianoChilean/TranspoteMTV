export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    usermodule: UserModule[];
}

export interface UserModule {
    asignacion_id:number;
    Modulo:{
        nombre:string,
        descripcion:string,
    };
    nombre_modulo:string;
    descrip_modulo:string;
    
}