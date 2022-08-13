export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    usuarios: Usuario[];
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