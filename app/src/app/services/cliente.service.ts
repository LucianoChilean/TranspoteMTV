import { Injectable } from '@angular/core';
import { Cliente, Direccion, FetchAllResponse} from '../interfaces/cliente.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http:HttpClient
  ) { }

  postDireccionesCliente(direccion:object){
    return this.http.post(`${base_url}/direcciones`,direccion)
  }

  deleteDireccionesCliente(id:number){
    return this.http.delete(`${base_url}/direcciones/${id}`)
  }


  getDireccionesCliente(id:number): Observable<Direccion[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/direcciones/DirByCliId/${id}`)
    .pipe(
      map(this.tDireccion)
    );
  }

  private tDireccion( resp: FetchAllResponse ) {

    const DirList: Direccion[] = resp.direcciones.map( direccion => {
 
     return{
      direccion_id: direccion.direccion_id,
      direccion: direccion.direccion,
      descripcion: direccion.descripcion,
      region_id: direccion.region_id,
      comuna_id: direccion.comuna_id,
      Region: direccion.Region,
      rnombre: direccion.Region.nombre,
      Comuna: direccion.Comuna,
      ccomuna: direccion.Comuna.nombre
      
     }
    })

   
    return DirList;
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/clientes`)
    .pipe(
      map(this.transform)
    );

  }

  getClientById(id:number): Observable<Cliente[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/clientes/${id}`) 
    .pipe(
      map(this.transform)
    );
  }


  private transform( resp: FetchAllResponse ) {

    const ClienteList: Cliente[] = resp.clientes.map( cliente => {
 
     return{
      cliente_id:cliente.cliente_id,
      nombre:cliente.nombre,
      rut:cliente.rut,
      giro:cliente.giro,
      direccion:cliente.direccion
     }
    })

   
    return ClienteList;
  }

  setCliente(Cliente:object){
    return this.http.post(`${base_url}/clientes/`,Cliente);
  }

  deleteCliente(id:number){
    return this.http.delete(`${base_url}/clientes/${id}`);
  }

  putCliente(id:number,Cliente:object){
    return this.http.put(`${base_url}/clientes/${id}`,Cliente);
  }


}
