import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Vehiculo,FetchAllResponse, Rampla } from '../interfaces/vehiculo.interface';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private http:HttpClient
  ) { }

  getImagen(data:string){
    return `${base_url}/upload/vehiculos/${data}`
  }

  setVehiculo(Vehiculo:object){
    return this.http.post(`${base_url}/vehiculos/`,Vehiculo);
  }

  deleteVehiculo(id:number){
    return this.http.delete(`${base_url}/vehiculos/${id}`);
  }

  putVehiculo(id:number,Vehiculo:object){
    return this.http.put(`${base_url}/vehiculos/${id}`,Vehiculo);
  }


  getVehiculo(): Observable<Vehiculo[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/vehiculos`)
    .pipe(
      map(this.transform)
    );

  }

  getRamplas(): Observable<Rampla[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/ramplas`)
    .pipe(
      map(this.tRampla)
    );
  } 

  private tRampla( resp: FetchAllResponse ) {

    const ramplasList: Rampla[] = resp.ramplas.map( rampla => {
 
     return{
      rampla_id: rampla.rampla_id,
      nombre: rampla.nombre,
      descripcion: rampla.descripcion
     }
    })

    return ramplasList;
  }


  private transform( resp: FetchAllResponse ) {

    const vehiculoList: Vehiculo[] = resp.vehiculos.map( vehiculo => {
 
     return{
      vehiculo_id: vehiculo.vehiculo_id,
      tipo_vehiculo: vehiculo.tipo_vehiculo,
      descripcion: vehiculo.descripcion,
      year: vehiculo.year,
      chasis: vehiculo.chasis,
      motor: vehiculo.motor,
      imagen: `${base_url}/upload/vehiculos/${vehiculo.imagen}`,
      conductor_id: vehiculo.conductor_id,
      propietario_id: vehiculo.propietario_id,
      rampla_id: vehiculo.rampla_id,
      patente: vehiculo.patente

     }
    })

    return vehiculoList;
  }

}