import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Despacho } from 'src/app/interfaces/despacho.interafece';
import { Tarifadespacho } from 'src/app/interfaces/tarifasdespacho.interface';
import { DespachoService } from 'src/app/services/despacho.service';
import { TarifadespachoService } from 'src/app/services/tarifadespacho.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  public despachos: Despacho[] = [];
  public tarifadespachos: Tarifadespacho[] = [];

  public Despacho = {
    id: 0,
    numero: '',
    descripcion:'',
    nave:  '',
    puerto_id: 0,
    conductor_id: 0,
    cliente_id: 0
  }

  public idDetalle = 0;
  public EstadoD = {
    estado: ''
  }

 
  constructor(
    private despacho:DespachoService,
    private tarifadesp:TarifadespachoService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.getDespachos();

  }

  getDespachos(){

    this.despacho.GetDespachos().subscribe(
      despachos =>{
        this.despachos = despachos;
      }
    );
  }



  getFactura(despachos:Despacho){

    this.idDetalle = despachos.despacho_id;
  
    this.tarifadesp.getTarifaDByDid(this.idDetalle)
    .subscribe( tarifasdepachos =>{
      this.tarifadespachos = tarifasdepachos
    } 
    );


  }

  setEstadoDespacho(){

    this.EstadoD.estado = 'Confirmado';
   
    this.despacho.EditaDespachoEstado(this.idDetalle,this.EstadoD).subscribe(
      despachos =>{
        this.getDespachos();
      })
      

  }

}
