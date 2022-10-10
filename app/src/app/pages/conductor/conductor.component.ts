import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { ConductorService } from 'src/app/services/conductor.service';
import { FileUploadService } from 'src/app/services/subirArchivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  public conductores: Conductor[] = [];
  public proveedores: Conductor[] = [];
  public conductselect: Conductor[] = [];
  p: number= 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public ngSelect : number = 0;
  public conductorForm = this.fb.group({});
  public imagenSubir: any = null;

  buildForm(data:any){
    this.conductorForm = this.fb.group({
      conductor_id:[data.conductor_id],
      nombre:[data.nombre,[Validators.required]],
      paterno:[data.paterno,[Validators.required]],
      materno:[data.materno,[Validators.required]],
      rut:[data.rut,[Validators.required]],
      fono:[data.fono,[Validators.required]],
      email:[data.email,[Validators.required]],
      tipo:['Conductor'],
      propietario_id:[data.propietario_id,[Validators.required]],
    });
  }


  constructor(
    private drive:ConductorService,
    private fb:FormBuilder,
    private upload:FileUploadService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.conductorForm ? this.conductorForm : '');
    this.ocultarRegistro = true;
    this.getConductores();
    this.getProveedor();
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
        title: 'El Conductor se creo exitosamente'
      })
      this.subirImagen(drive);
     })
    }
  }

  getFile($event:any):void{
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;

    this.imagenSubir = file;
   
  }

  getProveedor(){
    this.drive.getConductorByTipo('Proveedor')
    .subscribe(proveedor =>{
      this.proveedores = proveedor
    });
  }
  


  subirImagen(id:any){
    this.upload
      .actualizarFoto( this.imagenSubir, 'conductores',id )
      .then( img => {
        this.getConductores();
        this.buildForm('');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

  updateConductor(){
    this.drive.putConductor(this.conductorForm.value.conductor_id,this.conductorForm.value)
    .subscribe(drive=>{
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
        title: 'El Conductor se actualizo exitosamente'
      })
      this.getConductores();
    })
  }

  getDataDrive(conductores:Conductor){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.buildForm(conductores);

  }

  cancelUpdate(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.buildForm('');

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
