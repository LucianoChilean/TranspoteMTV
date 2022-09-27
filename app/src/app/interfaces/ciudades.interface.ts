export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    regiones: Region[];
    comuna: Comuna[];
}

export interface Region{
    region_id:number;
    nombre:string;
    orden:number;
    activo:number;
}

export interface Comuna{
    comuna_id:number;
    nombre:string;
    region_id:number;
}