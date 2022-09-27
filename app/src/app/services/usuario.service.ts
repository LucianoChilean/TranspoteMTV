import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';


import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario,FetchAllResponse, Rol } from '../interfaces/usuario.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http:HttpClient
  ) { }


  Login( formData: LoginForm ) {
    
    console.log(formData)

    return this.http.post(`${base_url}/auth/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                    localStorage.setItem('rol',resp.usuario.rol_id)
                  })
                );

  }

  setUsuario(Usuario:object){
    return this.http.post(`${base_url}/usuarios/`,Usuario);
  }

  deleteUsuario(id:number){
    return this.http.delete(`${base_url}/usuarios/${id}`);
  }

  putUsuario(id:number,Usuario:object){
    return this.http.put(`${base_url}/usuarios/${id}`,Usuario);
  }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/usuarios`)
    .pipe(
      map(this.transform)
    );

  }

  getRolUsuarios(){
    return  this.http.get(`${base_url}/usuarios/modules/1`);
  }

  getRoles(): Observable<Rol[]>{
    return this.http.get<FetchAllResponse>(`${base_url}/roles`) 
    .pipe(
      map(this.transforma)
    );
  }

  setRol(Roles:object){
    return this.http.post(`${base_url}/roles`,Roles);
  }

  putRol(id:number,Roles:object){
    return this.http.put(`${base_url}/roles/${id}`,Roles);
  }

  deleteRol(id:number){
    return this.http.delete(`${base_url}/roles/${id}`);
  }

  private transforma(resp: FetchAllResponse){

    const rolList: Rol[] = resp.roles.map(roles => {
      return{
        rol_id: roles.rol_id,
        nombre: roles.nombre,
        descripcion: roles.descripcion,
      }
    })

    return rolList;

  }


  private transform( resp: FetchAllResponse ) {

    const usuariosList: Usuario[] = resp.usuarios.map( usuario => {
 
     return{
      usuario_id: usuario.usuario_id,
      nombre_completo: usuario.nombre+' '+usuario.paterno+' '+usuario.materno,
      nombre: usuario.nombre,
      paterno: usuario.paterno,
      materno: usuario.materno,
      email: usuario.email,
      estado: usuario.estado,
      rol_id: usuario.rol_id,

     }
    })

    return usuariosList;
  }

}
