import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserModule,FetchAllResponse } from '../interfaces/userModule.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  public modulos:UserModule[] = [];

  constructor(
    private http:HttpClient
  ) { }


  postAsignacion(assign:object){
    return this.http.post(`${base_url}/asignaciones`,assign);
  }

  deleteAssign(id:number){
    return this.http.delete(`${base_url}/asignaciones/${id}`);
  }

  getUserModule(id:any): Observable<UserModule[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/asignaciones/getModule/${id}`)
    .pipe(
      map(this.transform)
    );

  }

  private transform( resp: FetchAllResponse ) {

    const usuariosList: UserModule[] = resp.usermodule.map( userm => {
 
     return{
      modulo_id: userm.modulo_id,
      asignacion_id: userm.asignacion_id,
      Modulo: userm.Modulo,
      nombre_modulo: userm.Modulo.nombre,
      descrip_modulo: userm.Modulo.descripcion,
      padre: userm.Modulo.modulo_padre,
      icons: userm.Modulo.icons

     }
    })

    return usuariosList;
  }



}
