import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { Detalle, FetchAllResponse } from '../interfaces/detalle.interface';


import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(
    private http:HttpClient
  ) { }

  GetDetalles(id:number): Observable<Detalle[]>{

    return this.http.get<FetchAllResponse>(`${base_url}/detalles/ByDesId/${id}`)
    .pipe(
      map(this.transform)
    );

  }


  private transform( resp: FetchAllResponse ) {

    const DetalleList: Detalle[] = resp.detalles.map( detalles => {
 

     return{
      detalle_id: detalles.detalle_id,
      descripcion: detalles.descripcion,
      tipo: detalles.tipo,
      peso: detalles.peso,
      fecha_retiro: detalles.fecha_retiro,
      tarjeton: detalles.tarjeton,
      fecha_entrega: detalles.fecha_entrega,
      Puerto: detalles.Puerto,
      pname: detalles.Puerto.nombre,
      Direccion: detalles.Direccion,
      dname: detalles.Direccion.direccion
     }
    })

   
    return DetalleList;
  }

  EliminaDespacho(id:number){
    return this.http.delete(`${base_url}/detalles/${id}`);
 }

 CreaDespacho(detalles:object){
   return this.http.post(`${base_url}/detalles/`,detalles);
 }

 EditaDespacho(id:number,detalles:object){
   return this.http.put(`${base_url}/detalles/${id}`,detalles);
}

}
