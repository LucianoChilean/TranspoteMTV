import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Modulo, FetchAllResponse } from '../interfaces/modulo.interface';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(
    private http:HttpClient
  ) { }

  getModulos(): Observable<Modulo[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/modulos`)
    .pipe(
      map(this.transform)
    );

  }


  private transform(resp: FetchAllResponse){

    const moduloList: Modulo[] = resp.modulos.map(modules => {
      return{
        modulo_id: modules.modulo_id,
        nombre: modules.nombre,
        descripcion: modules.descripcion,
      }
    })

    return moduloList;

  }



}
