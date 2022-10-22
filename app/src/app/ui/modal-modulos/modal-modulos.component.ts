import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Modulo } from 'src/app/interfaces/modulo.interface';
import { ModuloService } from 'src/app/services/modulo.service';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { UserModule } from 'src/app/interfaces/userModule.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-modulos',
  templateUrl: './modal-modulos.component.html',
  styleUrls: ['./modal-modulos.component.css']
})
export class ModalModulosComponent implements OnInit {

  public moduls: Modulo[] = [];
  public usermodulos:Modulo[] =[];
  public modulosA: Modulo[] = [];
  public modulosS: Modulo[] = [];
  public modulosD: Modulo[] = [];
  public ocultaInicio:boolean = false;
  public ocultaSupervisor: boolean = false;
  public ocultaAdministrador: boolean = false;


  @Input() idRol = 0;
  @Output() cerrar = new EventEmitter<boolean>();

  public moduloIn = {
    rol_id : 0,
    modulo_id : 0
  }

  public mForm = this.fb.group({
    checkArray: this.fb.array([]),
    unCheckArray: this.fb.array([])
  })

  constructor(
    private modulos:ModuloService,
    private asignacion:AsignacionService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.ocultaInicio = false;
    this.ocultaSupervisor = false;
    this.ocultaAdministrador = false;
    this.getModulos();
    this.getModulosByRol(this.idRol);
  }

  getModulos(){
    this.modulos.getModulos()
    .subscribe( modulo => {
      this.moduls = modulo

      modulo.map(moduls =>{
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
   
    });
  }

  getModulosByRol(id:any){
      this.asignacion.getUserModule(id)
      .subscribe(asignacion =>{
        this.usermodulos = asignacion
        console.log(asignacion)
        this.usermodulos.map(userm => {
          let verificaModulo =  this.moduls.filter(mod => mod.nombre === userm.nombre);
          if(verificaModulo){
            let doc = document.getElementById(verificaModulo[0].nombre);
           doc?.setAttribute('checked','checked');
          }
        })
      })
  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.mForm.get('checkArray') as FormArray;
    const unCheckArray: FormArray = this.mForm.get('unCheckArray') as FormArray;
    if(e.target.checked){
      checkArray.push(new FormControl(e.target.value));
    }else{
      unCheckArray.push(new FormControl(e.target.value));
      let i: number = 0;
      checkArray.controls.forEach((item) =>{
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      })
    }
  }


  GuardarModulos(){

    console.log(this.mForm.value.checkArray);

    console.log(this.mForm.value.unCheckArray);
  
     this.mForm.value.checkArray.forEach((item:number) => {
      console.log("Check",item)
      let verificarAsignacion = this.usermodulos.find((userm) => userm.modulo_id == item);
      if(!verificarAsignacion){
        console.log("HOLA")
        this.moduloIn.rol_id = this.idRol;
        this.moduloIn.modulo_id = item; 
        this.asignacion.postAsignacion(this.moduloIn)
        .subscribe(modAssign =>{
          console.log(modAssign);
          Swal.mixin({toast: true,position: 'bottom-end',showConfirmButton: false,
          timer: 3000,timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        }).fire({
          icon: 'success',
          title: 'Modulos asignados correctamente'
        })
        });
      }
     });

     

     this.mForm.value.unCheckArray.forEach((item:number) =>{
      let verificarAsignacion = this.usermodulos.find((userm) => userm.modulo_id == item);
      if(verificarAsignacion){
        console.log("UnCheck",verificarAsignacion.Asignacions.asignacion_id)
        this.asignacion.deleteAssign(verificarAsignacion.Asignacions.asignacion_id)
        .subscribe(delAssign =>{
          console.log(delAssign)
        });
      }
     });
    
   }

}
