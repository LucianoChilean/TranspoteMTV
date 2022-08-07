import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Vehiculo } from 'src/app/interfaces/vehiculos.interface';
import { VehiculosService } from 'src/app/services/vehiculos.service';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  public vehiculo: Vehiculo[] = [];


  constructor(
    private vehiculos:VehiculosService,
  ) { }

  ngOnInit(): void {
    this.getVehiculos();
  }

  getVehiculos(){
    this.vehiculos.GetVehiculos().subscribe(
      vehiculo =>{
        this.vehiculo = vehiculo;
      }
    );
  }


}
