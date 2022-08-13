import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
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
     
    })


  }


}
