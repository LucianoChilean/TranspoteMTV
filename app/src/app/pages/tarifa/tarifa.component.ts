import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tarifa } from 'src/app/interfaces/tarifa.interface';
import { TarifaService } from 'src/app/services/tarifa.service';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {

  public tarifas: Tarifa[] = [];
  p: number = 1;

  public tarifasForm = this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['',Validators.required],
    regla:['',Validators.required],
    costo:['',Validators.required],
    estado:['',Validators.required],
    valor_interno:['',Validators.required],
    valor_externo:['',Validators.required]
  });

  constructor(
    private tarifa:TarifaService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTarifas();
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
