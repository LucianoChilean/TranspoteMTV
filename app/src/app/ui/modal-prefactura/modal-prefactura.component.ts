import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { TarifaDetalle } from 'src/app/interfaces/tarifasdespacho.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { TarifadespachoService } from 'src/app/services/tarifadespacho.service';


@Component({
  selector: 'app-modal-prefactura',
  templateUrl: './modal-prefactura.component.html',
  styleUrls: ['./modal-prefactura.component.css']
})
export class ModalPrefacturaComponent implements OnInit {

  public detalles: TarifaDetalle[] = [];
  public clientes: Cliente[] = [];

  public total: number= 0;
  public iva: number = 0;
  public bruto: number= 0;

  @Input() idDespacho = 0;
  @Input() Estado = '';
  @Input() idDetails = 0;
  @Input() idClient = 0;

  @Output() cerrar = new EventEmitter<boolean>();

  constructor(
    private tarifad:TarifadespachoService,
    private client:ClienteService
  ) { }

  ngOnInit(): void {
    this.getTarifasDetalle(this.idDetails);
    this.getCliente(this.idClient);
  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

  getTarifasDetalle(id:number){
    this.tarifad.getTarifaDetalle(id)
    .subscribe(tDetalle =>{
     this.detalles = tDetalle
     console.log(this.detalles)

     this.total =  this.detalles.map(
      ({tvalore}) => tvalore).reduce((acc, value) => acc + value, 0);
 
      this.iva = this.total * 0.19;
      this.bruto = this.iva+this.total;
    })
  }

  getCliente(id:number){
    this.client.getClientById(id)
    .subscribe((cliente) =>{
    this.clientes = cliente
      console.log(this.clientes)
    })
  }

}
