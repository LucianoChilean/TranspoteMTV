import { Component, OnInit } from '@angular/core';
import { Modulo } from 'src/app/interfaces/modulo.interface';
import { UserModule } from 'src/app/interfaces/userModule.interface';
import { AsignacionService } from 'src/app/services/asignacion.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public id:string ='';
  public ocultaInicio:boolean = false;
  public ocultaSupervisor: boolean = false;
  public ocultaAdministrador: boolean = false;
  public modulosA: Modulo[] = [];
  public modulosS: Modulo[] = [];
  public modulosD: Modulo[] = [];

  constructor(
    private modules:AsignacionService
  ) { }

  ngOnInit(): void {
    this.ocultaInicio = false;
    this.ocultaSupervisor = false;
    this.ocultaAdministrador = false;
    this.getUserModules();
  
  }

  getUserModules(){
    this.id = localStorage.getItem('rol') || '';  

    this.modules.getUserModule(this.id)
    .subscribe(modulos =>{
      modulos.map(moduls =>{
        if(moduls.modulo_padre === 'Administrador'){
           this.ocultaAdministrador = true;
           this.modulosA.push(moduls);
        }
        if(moduls.modulo_padre === 'Supervision'){
          this.ocultaSupervisor = true;
          this.modulosS.push(moduls);
       }
       if(moduls.modulo_padre === 'Inicio'){
        this.ocultaInicio = true;
        this.modulosD.push(moduls);
      }
      })
    })
  }


}
