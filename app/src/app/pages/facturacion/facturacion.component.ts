import { Component, OnInit } from '@angular/core';
import { Detalle } from 'src/app/interfaces/detalle.interface';
import { DetalleService } from 'src/app/services/detalle.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {


  public detalles: Detalle[] = [];
  p: number = 1;

  constructor(
    private detalle:DetalleService,
  ) { }

  ngOnInit(): void {

    this.getAllDetalle();

  }

  getAllDetalle(){

    this.detalle.getDetallesByEstado('Confirmado')
    .subscribe(alldetalle=>{
      this.detalles = alldetalle
      console.log(this.detalles)
    })
  }

}
