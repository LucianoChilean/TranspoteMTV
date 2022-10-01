import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/interfaces/vehiculo.interface';
import { FileUploadService } from 'src/app/services/subirArchivo.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public vehiculos:Vehiculo[] =[];

  public imagenUrl = '';
  public imagenSubir: any = null;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public idVehiculo: number = 0;
  public ocultarModalVehiculo : boolean = false;
  public p: number = 1;
  public vehiculosForm =  this.fb.group({});

  buildForm(data:any){
      this.vehiculosForm = this.fb.group({
        vehiculo_id:[data.vehiculo_id],
        patente:[data.patente,[Validators.required]],
        chasis:[data.chasis,Validators.required],
        motor:[data.motor,Validators.required],
        year:[data.year,[Validators.required]],
        tipo_vehiculo:[data.tipo_vehiculo,[Validators.required]],
      });
  }
 


  constructor(
    private fb:FormBuilder,
    private vehiculo:VehiculoService,
    private upload:FileUploadService
  ) { }

  ngOnInit(): void {
   this.buildForm(this.vehiculosForm ? this.vehiculosForm : '');
   this.ocultarRegistro = true;
   this.getVehiculos();

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
       let  dataForm:any = vh;
        console.log(dataForm)
        this.getVehiculos();
      });
    }

   
  }



}
