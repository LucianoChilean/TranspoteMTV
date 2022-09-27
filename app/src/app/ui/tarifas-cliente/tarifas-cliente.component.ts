import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteTarifa, Tarifa } from 'src/app/interfaces/tarifa.interface';
import { TarifaService } from 'src/app/services/tarifa.service';


@Component({
  selector: 'app-tarifas-cliente',
  templateUrl: './tarifas-cliente.component.html',
  styleUrls: ['./tarifas-cliente.component.css']
})
export class TarifasClienteComponent implements OnInit {

  public TClienteForm: FormGroup= this.fb.group({});
  public Tcliente: ClienteTarifa[] = [];
  public tarifas: Tarifa[] = [];

  buildForm(data:any){
    this.TClienteForm = this.fb.group({
     tarifacliente_id:[data.rol_id],
     cliente_id:[data.tarifa,Validators.required],
     tarifa_id:[data.cliente,Validators.required],
     valor:[data.valor,Validators.required],
   });
 }

 @Input() idClient = 0;

 @Output() cerrar = new EventEmitter<boolean>();

  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public ngSelectTarifa = 0;
  p: number = 1;

  constructor(
    private fb:FormBuilder,
    private tarifa:TarifaService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.TClienteForm ? this.TClienteForm : '');
    this.ocultarRegistro = true;
    this.ngSelectTarifa = 0;
    this.getTarifaCliente(this.idClient);
    this.getTarifas();
  }

  getTarifas(){
    this.tarifa.getTarifas()
    .subscribe(tarifa =>{
      this.tarifas = tarifa
    })
  }

  getTarifaCliente(id:number){
    this.tarifa.getClienteTarifa(id)
    .subscribe(ctarifa =>{
      this.Tcliente = ctarifa
    })
  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

  guardarTarifa(){
    this.TClienteForm.value.cliente_id = this.idClient;
    console.log(this.TClienteForm.value)

    this.tarifa.postTarifaCliente(this.TClienteForm.value)
    .subscribe(tcliente =>{
      this.getTarifaCliente(this.idClient);
    })

  }

  eliminarTarifa(id:number){
      this.tarifa.deleteTCliente(id)
      .subscribe(tcliente =>{
        this.getTarifaCliente(this.idClient);
      })
  }

}
