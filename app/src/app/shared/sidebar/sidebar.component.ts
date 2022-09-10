import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/interfaces/userModule.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public id:string ='';
  public usermodulos:UserModule[] =[];
  public ocultaInicio:boolean = false;
  public ocultaSupervisor: boolean = false;
  public ocultaAdministrador: boolean = false;


  constructor(
    private users:UsuarioService,
    private modules:AsignacionService
  ) { }

  ngOnInit(): void {

  
   this.getUserModules();
  
  }

  getUserModules(){
    this.id = localStorage.getItem('rol') || '';  

    this.modules.getUserModule(this.id)
    .subscribe(modulos =>{
     this.usermodulos = modulos
     console.log(this.usermodulos)
    })


  }


}
