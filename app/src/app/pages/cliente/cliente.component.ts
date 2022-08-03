import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tarifa } from 'src/app/interfaces/tarifa.interface';
import { TarifaService } from 'src/app/services/tarifa.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public tarifas: Tarifa[] = [];

  constructor(
    private tarifa:TarifaService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
  }

  getTarifas(){
    this.tarifa.getTarifas()
    .subscribe( tarifa =>
      {
        this.tarifas = tarifa;
    }
    );
  }

}
