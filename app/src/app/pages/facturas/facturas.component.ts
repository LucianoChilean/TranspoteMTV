import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Despacho } from 'src/app/interfaces/despacho.interafece';
import { Detalle } from 'src/app/interfaces/detalle.interface';
import { Tarifadespacho } from 'src/app/interfaces/tarifasdespacho.interface';
import { DespachoService } from 'src/app/services/despacho.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { TarifadespachoService } from 'src/app/services/tarifadespacho.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  public despachos: Despacho[] = [];
  public tarifadespachos: Tarifadespacho[] = [];
  public detalles: Detalle[] = [];
  public FormText: string = '';


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
    private detalle:DetalleService,
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

  
  CargaDetalle(despacho:Despacho){

    this.FormText = despacho.numero;
    
    this.LoadDet(despacho.despacho_id);

  }

  LoadDet(id:number){
    this.detalle.GetDetalles(id)
    .subscribe(detalles =>{
      this.detalles = detalles;
    });
  }

}
