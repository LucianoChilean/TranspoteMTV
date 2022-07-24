export interface FetchAllResponse{
    count: number;
    next: null;
    previus: null;
    puertos: Puerto[];
}

export interface Puerto {
    puerto_id:number;
    nombre: string;
}