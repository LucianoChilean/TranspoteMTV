import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
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
  public ocultaInicio:boolean = true;


  constructor(
    private users:UsuarioService,
    private modules:AsignacionService
  ) { }

  ngOnInit(): void {

  
   this.getUserModules();
  
  }

  show(menu:string){

    

    console.log(menu)

  }


  getUserModules(){
    this.id = localStorage.getItem('rol') || '';  

    this.modules.getUserModule(this.id)
    .subscribe(modulos =>{
     this.usermodulos = modulos
    })


  }


}
