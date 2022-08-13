import { Injectable } from '@angular/core';
import { Cliente, FetchAllResponse} from '../interfaces/cliente.interface';
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


  getClientes(): Observable<Cliente[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/clientes`)
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
