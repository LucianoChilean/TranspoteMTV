import { Injectable } from '@angular/core';
import { Conductor, FetchAllResponse} from '../interfaces/conductor.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(
    private http:HttpClient
  ) { }

  GetConductores(): Observable<Conductor[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/conductores`)
    .pipe(
      map(this.transform)
    );

  }


  private transform( resp: FetchAllResponse ) {

    const ConductorList: Conductor[] = resp.conductores.map( conductor => {
 
     return{
      conductor_id: conductor.conductor_id,
      nombre_completo: conductor.nombre+' '+conductor.paterno+' '+conductor.materno,
      nombre: conductor.nombre,
      paterno: conductor.paterno,
      materno: conductor.materno,
      rut: conductor.rut,
      fono: conductor.fono,
      email: conductor.email,
      tipo: conductor.tipo,
      giro: conductor.giro,
      imagen: conductor.imagen
     }
    })

   
    return ConductorList;
  }

  setConductor(Conductor:object){
    return this.http.post(`${base_url}/conductores/`,Conductor);
  }

  deleteConductor(id:number){
    return this.http.delete(`${base_url}/conductores/${id}`);
  }

  putConductor(id:number,Conductor:object){
    return this.http.put(`${base_url}/conductores/${id}`,Conductor);
  }
}
