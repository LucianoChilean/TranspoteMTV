import { Injectable } from '@angular/core';
import { Vehiculo, FetchAllResponse} from '../interfaces/vehiculos.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(
    private http:HttpClient
  ) { }

  GetVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/vehiculos`)
    .pipe(
      map(this.transform)
    );
  }

  private transform( resp: FetchAllResponse ) {

    const VehiculoList: Vehiculo[] = resp.vehiculos.map( vehiculo => {
    return{
      vehiculos_id: vehiculo.vehiculos_id,
      patente: vehiculo.patente,
      rampla_id: vehiculo.rampla_id,
      descripcion: vehiculo.descripcion,
      tipo_vehiculo: vehiculo.tipo_vehiculo,
      conductor_id: vehiculo.conductor_id,
      propietario_rut: vehiculo.propietario_rut,
      fecha: vehiculo.fecha,
      chasis: vehiculo.chasis,
      motor: vehiculo.motor,
      imagen: vehiculo.imagen
    }
    })
   
    return VehiculoList;
  }

}

