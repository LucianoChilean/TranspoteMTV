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


  private transform( resp: FetchAllResponse ) {

    const PuertoList: Puerto[] = resp.puertos.map( puerto => {
 
     return{
      puerto_id:puerto.puerto_id,
      nombre:puerto.nombre,
    
     }
    })

   
    return PuertoList;
  }
}
