import { Injectable } from '@angular/core';
import { Direccion, FetchAllResponse} from '../interfaces/direccion.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(
    private http:HttpClient
  ) { }

  GetDirecciones(id:number): Observable<Direccion[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/direcciones/DirByCliId/${id}`)
    .pipe(
      map(this.transform)
    );

  }


  private transform( resp: FetchAllResponse ) {

    const DireccionList: Direccion[] = resp.direcciones.map( direccion => {
 
     return{
      direccion_id:direccion.direccion_id,
      direccion: direccion.direccion,
      descripcion: direccion.descripcion
    
     }
    })

   
    return DireccionList;
  }

}
