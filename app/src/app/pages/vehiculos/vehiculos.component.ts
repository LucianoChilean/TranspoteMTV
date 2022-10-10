import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { Rampla, Vehiculo } from 'src/app/interfaces/vehiculo.interface';
import { ConductorService } from 'src/app/services/conductor.service';
import { FileUploadService } from 'src/app/services/subirArchivo.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public vehiculos:Vehiculo[] = [];
  public proveedores: Conductor[] = [];
  public conductores: Conductor[] = [];
  public ramplas: Rampla[] = [];

  public imagenUrl = '';
  public imagenSubir: any = null;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public idVehiculo: number = 0;
  public ocultarModalVehiculo : boolean = false;
  public p: number = 1;
  public ngSelect = 0;
  public vehiculosForm =  this.fb.group({});

  buildForm(data:any){
      this.vehiculosForm = this.fb.group({
        vehiculo_id:[data.vehiculo_id],
        patente:[data.patente,[Validators.required]],
        chasis:[data.chasis,Validators.required],
        motor:[data.motor,Validators.required],
        year:[data.year,[Validators.required]],
        tipo_vehiculo:[data.tipo_vehiculo,[Validators.required]],
        propietario_id:[data.propietario_id,Validators.required],
        conductor_id:[data.conductor_id,Validators.required],
        rampla_id:[data.rampla_id,Validators.required]
      });
  }
 


  constructor(
    private fb:FormBuilder,
    private vehiculo:VehiculoService,
    private upload:FileUploadService,
    private conductor:ConductorService
  ) { }

  ngOnInit(): void {
   this.buildForm(this.vehiculosForm ? this.vehiculosForm : '');
   this.ocultarRegistro = true;
   this.getVehiculos();
   this.getProveedor();
   this.getRamplas();
  }

  getProveedor(){
    this.conductor.getConductorByTipo('Proveedor')
    .subscribe(proveedor =>{
      this.proveedores = proveedor
    });
  }

  getConductores(dato:any){
    this.conductor.getConductorByPropietario(dato.value)
    .subscribe(conductor =>{
      this.conductores = conductor
    })
  }

  getRamplas(){
    this.vehiculo.getRamplas()
    .subscribe(rampla =>{
      console.log(rampla)
      this.ramplas = rampla
    })
  }

  getVehiculos(){
    this.vehiculo.getVehiculo()
    .subscribe( vehiculo =>{
      this.vehiculos = vehiculo
      this.vehiculos.map(vh => {
       this.imagenUrl = this.vehiculo.getImagen(vh.imagen);
      })
    });
  
   
  }

  goToLoadModal(evento:boolean,vehiculo:number){
    this.ocultarModalVehiculo = evento;
    this.idVehiculo = vehiculo;

  }

  getDataVehiculo(vehiculo:object){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.buildForm(vehiculo);
  }

  cancelEdit(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.buildForm('');
  }

  updateVehiculo(){

    Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).fire({
      icon: 'success',
      title: 'El Vehiculo Actualizado'
    })
   
    this.vehiculo.putVehiculo(this.vehiculosForm.value.vehiculo_id,this.vehiculosForm.value)
    .subscribe(vh =>{
      this.getVehiculos();
    })

  }

  getFile($event:any):void{
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;

    this.imagenSubir = file;
   
  }

  deleteVehiculo(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Va a eliminar un vehiculo del listado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire(
          `Vehiculo eliminado`,
          '',
          'success'
        )
        this.vehiculo.deleteVehiculo(id)
        .subscribe(vh => {
          console.log(vh)
          this.getVehiculos();
        })
    
      }
    })
   
  }


  setVehiculo(){
  
    if(this.vehiculosForm.invalid){
      Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      }).fire({
        title: 'Campo requerido ',
        text: 'Debe ingresar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
        reverseButtons: true
      })

    }else{
      Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: 'El Vehiculo se creo exitosamente'
      })
      this.vehiculo.setVehiculo(this.vehiculosForm.value)
      .subscribe(vh => {
       this.subirImagen(vh);
      });
    }
  }

  subirImagen(id:any){
    this.upload
      .actualizarFoto( this.imagenSubir, 'vehiculos',id )
      .then( img => {
        this.getVehiculos();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }



}
