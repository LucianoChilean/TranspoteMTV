import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Direccion, FetchAllResponse } from '../interfaces/direccion.interface';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(
    private http:HttpClient
  ) { }

  GetDireccionesCliente(id:number): Observable<Direccion[]>{

    return this.http.get<FetchAllResponse>(`${base_url}/direcciones//DirByCliId/${id}`)
    .pipe(
      map(this.transform)
    );

  }

  private transform( resp: FetchAllResponse ) {

    const DireccionList: Direccion[] = resp.direcciones.map( direcciones => {
     return{
      direccion_id: direcciones.direccion_id,
      direccion: direcciones.direccion,
      descripcion: direcciones.descripcion
     }
    })

   
    return DireccionList;
  }

  EliminaDireccion(id:number){
    return this.http.delete(`${base_url}/direccion/${id}`);
 }

 CreaDireccion(direccion:object){
   return this.http.post(`${base_url}/direcciones/`,direccion);
 }

 EditaDireccion(id:number,direccion:object){
   return this.http.put(`${base_url}/direcciones/${id}`,direccion);
}


}
