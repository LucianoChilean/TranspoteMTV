import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Despacho } from 'src/app/interfaces/despacho.interafece';
import { DespachoService } from 'src/app/services/despacho.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  public despachos: Despacho[] = [];

  constructor(
    private despacho:DespachoService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.getDespachos();

  }

  getDespachos(){

    /*
    this.despacho.GetDespachosByEstado('Confirmado').subscribe(
      despachos =>{
        this.despachos = despachos;
      }
    );
*/

}

}
