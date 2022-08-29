import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Tarifadespacho, FetchAllResponse, TarifaDetalle } from '../interfaces/tarifasdespacho.interface';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TarifadespachoService{

  constructor(
    private http:HttpClient
  ) { }

  

  getTarifaDByDid(id:number): Observable<Tarifadespacho[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/tarifasd/DespachoId/${id}`).pipe(
      map(this.transform)
    );
  }

  getTarifasDespacho(): Observable<Tarifadespacho[]>{

    return this.http.get<FetchAllResponse>(`${base_url}/tarifasd`)
    .pipe(
      map(this.transform)
    );

  }

  getTarifaDetalle(id:number): Observable<TarifaDetalle[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/tarifasdet/DetalleId/${id}`)
    .pipe(
      map(this.transformdos)
    );
  }

  private transformdos(resp: FetchAllResponse){

    const tarifadetallelist: TarifaDetalle[] = resp.tarifadetalles.map(tarifadetalle =>{

        return{
          tarifadetalle_id: tarifadetalle.tarifadetalle_id,
          Tarifa:  tarifadetalle.Tarifa,
          tnombre: tarifadetalle.Tarifa.nombre,
          tvalore: tarifadetalle.Tarifa.valor_externo,
          tvalori: tarifadetalle.Tarifa.valor_interno
        }

    });

    return tarifadetallelist;

  }

  private transform(resp: FetchAllResponse){

    const tarifadespachoList: Tarifadespacho[] = resp.tarifadespachos.map(tarifades =>{

      return{
        tarifadespacho_id: tarifades.tarifadespacho_id,
        despacho_id: tarifades.despacho_id,
        Tarifa: tarifades.Tarifa,
        nombre: tarifades.Tarifa.nombre,
        valor_externo: tarifades.Tarifa.valor_externo

      }

    });

    return tarifadespachoList;
  }

  EliminarTarifa(id:number){
    return this.http.delete(`${base_url}/tarifasd/${id}`);
  }

  CrearTarifa(Tarifad:object){
    return this.http.post(`${base_url}/tarifasd/`,Tarifad);
  }

  EditaTarifa(id:number,Tarifad:object){
    return this.http.put(`${base_url}/tarifasd/${id}`,Tarifad);
  }

  createTaridaDetalle(tarifad:object){ 
    return this.http.post(`${base_url}/tarifasdet/`,tarifad);
  }

}
