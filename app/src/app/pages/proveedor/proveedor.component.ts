import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comuna, Region } from 'src/app/interfaces/ciudades.interface';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ConductorService } from 'src/app/services/conductor.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveedores: Conductor[] = [];
  public regiones: Region[] = [];
  public comunas: Comuna[] = [];
  p: number= 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public proveedorForm = this.fb.group({});

  buildForm(data:any){
    this.proveedorForm = this.fb.group({
      conductor_id:[data.conductor_id],
      nombre:[data.nombre,Validators.required],
      rut:[data.rut,Validators.required],
      fono:[data.fono,Validators.required],
      email:[data.email,Validators.required],
      tipo:['Proveedor'],
      giro:[data.giro,Validators.required],
      region_id:[data.region_id,Validators.required],
      comuna_id:[data.comuna_id,Validators.required]
    });
  }



  constructor(
    private fb:FormBuilder,
    private proveedor:ConductorService,
    private city:CiudadesService,
  ) { }

  ngOnInit(): void {
    this.buildForm(this.proveedorForm ? this.proveedorForm : '');
    this.ocultarRegistro = true;
    this.getProovedores();
    this.getRegiones();
  }

  getRegiones(){
    this.city.getRegiones()
    .subscribe(region => {
      this.regiones = region
    })
  }

  getComunas(dato:any){
    this.city.getComunasByRegion(dato.value)
    .subscribe(comuna => {
      this.comunas = comuna
    })
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
    this.buildForm(conductores);
  }

  cancelProveedor(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.buildForm('');
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
