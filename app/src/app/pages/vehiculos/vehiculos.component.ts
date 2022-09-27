import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/interfaces/vehiculo.interface';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public vehiculos:Vehiculo[] =[];

  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public idVehiculo: number = 0;
  public ocultarModalVehiculo : boolean = false;


  public vehiculosForm = this.fb.group({
    vehiculo_id:[''],
    patente:['',[Validators.required]],
    chasis:['',Validators.required],
    motor:['',Validators.required],
    year:['',[Validators.required]],
    tipo_vehiculo:['',[Validators.required]],
  });


  constructor(
    private fb:FormBuilder,
    private vehiculo:VehiculoService
  ) { }

  ngOnInit(): void {

   this.ocultarRegistro = true;
   this.getVehiculos();

  }

  getVehiculos(){

    this.vehiculo.getVehiculo()
    .subscribe( vehiculo =>{
      this.vehiculos = vehiculo
      console.log(vehiculo)
    });
    
  }

  goToLoadModal(evento:boolean,vehiculo:number){
    this.ocultarModalVehiculo = evento;
    this.idVehiculo = vehiculo;

  }

  setVehiculo():void{

    this.vehiculo.setVehiculo(this.vehiculosForm.value)
    .subscribe( vehiculo => {
    });


  }



}
