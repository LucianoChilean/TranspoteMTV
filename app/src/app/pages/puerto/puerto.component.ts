import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comuna, Region } from 'src/app/interfaces/ciudades.interface';
import { Puerto } from 'src/app/interfaces/puerto.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { PuertoService } from 'src/app/services/puerto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puerto',
  templateUrl: './puerto.component.html',
  styleUrls: ['./puerto.component.css']
})
export class PuertoComponent implements OnInit {

  public regiones: Region[] = [];
  public comunas: Comuna[] = [];
  public puertos: Puerto[] = [];
  public puertoForm = this.fb.group({})

  p: number= 1;
  
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  buildForm(data:any){
    this.puertoForm = this.fb.group({
      puerto_id:[data.puerto_id],
      nombre:[data.nombre,Validators.required],
      region_id:[data.region_id,Validators.required],
      comuna_id:[data.comuna_id,Validators.required]
    })
  }

  constructor(
    private fb:FormBuilder,
    private puerto:PuertoService,
    private city:CiudadesService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.puertoForm ? this.puertoForm : '');
    this.ocultarRegistro = true;
    this.getRegiones();
    this.getPuertos();
  }

  setPuerto(){
    this.puerto.setPuerto(this.puertoForm.value)
    .subscribe(port =>{
      this.getPuertos();
    })
  }

  getPuertos(){
    this.puerto.GetPuertos()
    .subscribe(puerto => {
      this.puertos = puerto
    })
  }

  putPuerto(){

    this.ocultarEditar = false;
    this.ocultarRegistro = true;
    this.puerto.putPuerto(this.puertoForm.value.puerto_id,this.puertoForm.value)
    .subscribe(puerto=>{
      this.buildForm('');
      this.getPuertos();
    })
  }

  getDataPuertos(puertos:Puerto){
    this.ocultarEditar = true;
    this.ocultarRegistro = false;
    this.buildForm(puertos);
  }

  cancelEdit(){
    this.ocultarEditar = false;
    this.ocultarRegistro = true;
    this.buildForm('');
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

  deletePuerto(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara al Puerto`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          `Puerto Eliminado`,
          '',
          'success'
        )
        this.puerto.deletePuerto(id)
        .subscribe( puerto =>{
          this.getPuertos();
        })
      }
    })
   
  }

}
