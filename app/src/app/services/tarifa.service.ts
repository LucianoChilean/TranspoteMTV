import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Tarifa, FetchAllResponse } from '../interfaces/tarifa.interface';


import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(
    private http:HttpClient
  ) { }


    deleteTarifa(id:number){
      return this.http.delete(`${base_url}/tarifas/${id}`);
    }

    createTarifa(Tarifa:object){
      return this.http.post(`${base_url}/tarifas/`,Tarifa);
    }

    updateTarifa(id:number,Tarifa:object){
      return this.http.put(`${base_url}/tarifas/${id}`,Tarifa);
    }

    getTarifas(): Observable<Tarifa[]>{

      return this.http.get<FetchAllResponse>(`${base_url}/tarifas`)
      .pipe(
        map(this.transform)
      );
  
    }

    getTarifasByEstado(): Observable<Tarifa[]>{

      return this.http.get<FetchAllResponse>(`${base_url}/tarifas/byEstado/1`)
      .pipe(
        map(this.transform)
      );
  
    }
  
  
    private transform( resp: FetchAllResponse ) {
  
      const TarifaList: Tarifa[] = resp.tarifas.map( tarifa => {
   
  
       return{
        tarifa_id: tarifa.tarifa_id,
        nombre: tarifa.nombre,
        descripcion: tarifa.descripcion,
        regla: tarifa.regla,
        costo: tarifa.costo,
        estado: tarifa.estado,
        valor_interno: tarifa.valor_interno,
        valor_externo: tarifa.valor_externo
       }
      })
  
     
      return TarifaList;
    }

}
