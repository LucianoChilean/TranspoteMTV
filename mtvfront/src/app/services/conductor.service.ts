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
      nombre: conductor.nombre+' '+conductor.paterno+' '+conductor.materno,
      paterno: conductor.paterno,
      materno: conductor.materno,
      rut: conductor.rut

     }
    })

   
    return ConductorList;
  }
}
