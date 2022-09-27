export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    usuarios: Usuario[];
    roles: Rol[];
}

export interface Usuario {
    usuario_id:number;
    nombre_completo:string;
    nombre:string;
    paterno:string;
    materno:string;
    email:string;
    estado:boolean;
    rol_id: {
        nombre:string
    };
}


export interface Rol{
    rol_id:number;
    nombre:string;
    descripcion:string;
}