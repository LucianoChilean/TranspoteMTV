import { Injectable } from '@angular/core';
import { Puerto, FetchAllResponse} from '../interfaces/puerto.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PuertoService {

  constructor(
    private http:HttpClient
  ) { }

  GetPuertos(): Observable<Puerto[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/puertos`)
    .pipe(
      map(this.transform)
    );

  }

  setPuerto(puerto:object){
    return this.http.post(`${base_url}/puertos`,puerto)
  }

  putPuerto(id:number,puerto:object){
    return this.http.put(`${base_url}/puertos/${id}`,puerto)
  }

  deletePuerto(id:number){
    return this.http.delete(`${base_url}/puertos/${id}`)
  }



  private transform( resp: FetchAllResponse ) {

    const PuertoList: Puerto[] = resp.puertos.map( puerto => {
 
     return{
      puerto_id:puerto.puerto_id,
      nombre:puerto.nombre,
      Region: puerto.Region,
      rnombre: puerto.Region.nombre,
      Comuna: puerto.Comuna,
      cnombre: puerto.Comuna.nombre
    
     }
    })

   
    return PuertoList;
  }
}
