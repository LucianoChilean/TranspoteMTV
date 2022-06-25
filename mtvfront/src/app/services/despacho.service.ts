import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  private transform( resp: FetchAllResponse ) {


   // console.log(resp);

    const DespachotList: Despacho[] = resp.despachos.map( despacho => {
 
     // const email =  (ticket.Usuario)? ticket.Usuario.email: '';
     return{
      despacho_id: despacho.despacho_id,
      numero: despacho.numero,
      descripcion: despacho.descripcion,
      nave: despacho.nave
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

}
