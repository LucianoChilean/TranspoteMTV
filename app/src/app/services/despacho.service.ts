import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Despacho, FetchAllResponse } from '../interfaces/despacho.interafece';


import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DespachoService {

  private despachos: object = {};

  constructor(
    private http:HttpClient
  ) { }



  GetDespachos(): Observable<Despacho[]>{

    return this.http.get<FetchAllResponse>(`${base_url}/despachos`)
    .pipe(
      map(this.transform)
    );

  }

  GetDespachosByEstado(estado:string): Observable<Despacho[]>{

    return this.http.get<FetchAllResponse>(`${base_url}/despachos/ByEstado/${estado}`)
    .pipe(
      map(this.transform)
    );

  }
  
  dtGet(estado:string){
    return this.http.get(`${base_url}/despachos/ByEstado/${estado}`);
  }

  private transform( resp: FetchAllResponse ) {

    const DespachotList: Despacho[] = resp.despachos.map( despacho => {
 

     return{
      despacho_id: despacho.despacho_id,
      numero: despacho.numero,
      descripcion: despacho.descripcion,
      nave: despacho.nave,
      estado:despacho.estado,
      Puerto: despacho.Puerto,
      puerto_id: despacho.Puerto.puerto_id,
      Puertonombre: despacho.Puerto.nombre,
      conductor: despacho.conductor,
      conductor_id: despacho.conductor.conductor_id,
      cname: despacho.conductor.nombre+' '+despacho.conductor.paterno+' '+despacho.conductor.materno,
      Cliente: despacho.Cliente,
      cliente_id: despacho.Cliente.cliente_id,
      cliname: despacho.Cliente.nombre
     }
    })

   
    return DespachotList;
  }

  EliminaDespacho(id:number){
    return this.http.delete(`${base_url}/despachos/${id}`);
 }

 CreaDespacho(Despacho:object){
   return this.http.post(`${base_url}/despachos/`,Despacho);
 }

 EditaDespacho(id:number,Despacho:object){
   return this.http.put(`${base_url}/despachos/${id}`,Despacho);
}

EditaDespachoEstado(id:number,Despacho:object){
  return this.http.put(`${base_url}/despachos/ByEstado/${id}`,Despacho);
}

}
