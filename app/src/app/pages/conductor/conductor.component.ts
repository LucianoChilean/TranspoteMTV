import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { ConductorService } from 'src/app/services/conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  public conductores: Conductor[] = [];
  p: number= 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  public conductorForm = this.fb.group({
    conductor_id:[''],
    nombre:[''],
    paterno:[''],
    materno:[''],
    rut:[''],
    fono:[''],
    email:[''],
    tipo:['Conductor'],
    giro:[''],
    imagen:['']
  });


  constructor(
    private drive:ConductorService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.ocultarRegistro = true;
    this.getConductores();
  }

  getConductores(){
    this.drive.getConductorByTipo('Conductor')
    .subscribe(drive=>{
      this.conductores = drive
    })
  }

  setConductor(){
    if(this.conductorForm.invalid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: 'Campo requerido ',
        text: 'Debe ingresar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
        reverseButtons: true
      })
    }else{
     this.drive.setConductor(this.conductorForm.value)
     .subscribe(drive=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'El Conductor se creo exitosamente'
      })
      this.getConductores();
     })
    }
  }

  updateConductor(){
    this.drive.putConductor(this.conductorForm.value.conductor_id,this.conductorForm.value)
    .subscribe(drive=>{
      this.getConductores();
    })
  }

  getDataDrive(conductores:Conductor){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.conductorForm.setValue({
      conductor_id:conductores.conductor_id,
      nombre:conductores.nombre,
      paterno:conductores.paterno,
      materno:conductores.materno,
      rut:conductores.rut,
      fono:conductores.fono,
      email:conductores.email,
      tipo:conductores.tipo,
      giro:conductores.giro,
      imagen:conductores.imagen
    });

  }

  cancelUpdate(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.conductorForm.setValue({
      conductor_id:'',
      nombre:'',
      paterno:'',
      materno:'',
      rut:'',
      fono:'',
      email:'',
      tipo:'',
      giro:'',
      imagen:''
    });

  }

  eraseConductor(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el detalle`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          `Tarifa Eliminada`,
          '',
          'success'
        )
      this.drive.deleteConductor(id)
      .subscribe(drive =>{
        this.getConductores();
      })
      }
    })

  }

}
