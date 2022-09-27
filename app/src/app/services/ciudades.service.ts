import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Comuna, FetchAllResponse, Region } from '../interfaces/ciudades.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

 

  constructor(
    private http:HttpClient
  ) { }


  getRegiones(): Observable<Region[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/regiones`)
    .pipe(
      map(this.Gregiones)
    );
  }

  getComunasByRegion(id:number): Observable<Comuna[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/comunas/${id}`)
    .pipe(
      map(this.Gcomunas)
    );
  }

  private Gcomunas(resp: FetchAllResponse){

    const comunaList: Comuna[] = resp.comuna.map(comuna  =>{

        return{
            comuna_id: comuna.comuna_id,
            nombre: comuna.nombre,
            region_id: comuna.region_id
        }

    })
    return comunaList;
  }

  private Gregiones( resp: FetchAllResponse ) {

    const regionList: Region[] = resp.regiones.map( region => {
 
     return{
        region_id:region.region_id,
        nombre: region.nombre,
        orden: region.orden,
        activo: region.activo
     }
    })
    return regionList;
  }





}
