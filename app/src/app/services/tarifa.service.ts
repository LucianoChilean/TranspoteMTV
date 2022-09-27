import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Tarifa, FetchAllResponse, ClienteTarifa } from '../interfaces/tarifa.interface';


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

    getClienteTarifa(id:number): Observable<ClienteTarifa[]>{

      return this.http.get<FetchAllResponse>(`${base_url}/tarifasc/${id}`)
      .pipe(
        map(this.transformClientaTarifa)
      );
    }

    getTarifasByEstado(): Observable<Tarifa[]>{

      return this.http.get<FetchAllResponse>(`${base_url}/tarifas/byEstado/1`)
      .pipe(
        map(this.transform)
      );
  
    }

    postTarifaCliente(tcliente:object){
      return this.http.post(`${base_url}/tarifasc`,tcliente);
    }

    deleteTCliente(id:number){
      return this.http.delete(`${base_url}/tarifasc/${id}`);
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


    private transformClientaTarifa( resp: FetchAllResponse ) {
  
      const ClientList: ClienteTarifa[] = resp.clientetarifa.map( ctarifa => {
   
  
       return{
        clientetarifa_id: ctarifa.clientetarifa_id,
        cliente_id: ctarifa.cliente_id,
        tarifa_id: ctarifa.tarifa_id,
        valor: ctarifa.valor,
        Tarifa:ctarifa.Tarifa,
        tnombre: ctarifa.Tarifa.nombre
        
       }
       
      })
  
     
      return ClientList;
    }

}
