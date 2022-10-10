import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Modulo,FetchAllResponse } from '../interfaces/modulo.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {


  constructor(
    private http:HttpClient
  ) { }


  postAsignacion(assign:object){
    return this.http.post(`${base_url}/asignaciones`,assign);
  }

  deleteAssign(id:number){
    return this.http.delete(`${base_url}/asignaciones/${id}`);
  }

  getUserModule(id:any): Observable<Modulo[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/asignaciones/getModule/${id}`)
    .pipe(
      map(this.transform)
    );

  }

  private transform( resp: FetchAllResponse ) {

    const usuariosList: Modulo[] = resp.modulos.map( userm => {
 
     return{
      modulo_id: userm.modulo_id,
      nombre: userm.nombre,
      descripcion: userm.descripcion,
      modulo_padre: userm.modulo_padre,
      modulo_orden: userm.modulo_orden,
      padre_orden: userm.padre_orden,
      icons: userm.icons,
      Asignacions: userm.Asignacions,
      asignacion_id: userm.Asignacions.asignacion_id

     }
    })

    return usuariosList;
  }



}
