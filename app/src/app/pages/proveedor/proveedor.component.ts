import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { ConductorService } from 'src/app/services/conductor.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveedores: Conductor[] = [];
  p: number= 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  public proveedorForm = this.fb.group({
    conductor_id:[''],
    nombre:[''],
    rut:[''],
    fono:[''],
    email:[''],
    tipo:['Proveedor'],
    giro:['']
  });


  constructor(
    private fb:FormBuilder,
    private proveedor:ConductorService
  ) { }

  ngOnInit(): void {
    this.ocultarRegistro = true;
    this.getProovedores();
  }

  getProovedores(){
    this.proveedor.getConductorByTipo('Proveedor')
    .subscribe(proveedor=>{
      this.proveedores = proveedor
    })
  }

  setProveedor(){
    if(this.proveedorForm.invalid){
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
     this.proveedor.setConductor(this.proveedorForm.value)
     .subscribe(proveedor=>{
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
        title: 'El Proveedor se creo exitosamente'
      })
      this.getProovedores();
     })
    }

  }

  updateProveedor(){
    this.proveedor.putConductor(this.proveedorForm.value.conductor_id,this.proveedorForm.value)
    .subscribe(drive=>{
      this.getProovedores();
    })

  }

  getDataProvider(conductores:Conductor){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.proveedorForm.setValue({
      conductor_id:conductores.conductor_id,
      nombre:conductores.nombre,
      rut:conductores.rut,
      fono:conductores.fono,
      email:conductores.email,
      giro:conductores.giro,
      tipo:'Proveedor',
    });
  }

  cancelProveedor(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.proveedorForm.setValue({
      conductor_id:'',
      nombre:'',
      rut:'',
      fono:'',
      email:'',
      tipo:'Proveedor',
      giro:'',
    });
  }

  eraseProveedor(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara al Proveedor`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          `Proveedor Eliminado`,
          '',
          'success'
        )
      this.proveedor.deleteConductor(id)
      .subscribe(drive =>{
        this.getProovedores();
      })
      }
    })

  }

}
