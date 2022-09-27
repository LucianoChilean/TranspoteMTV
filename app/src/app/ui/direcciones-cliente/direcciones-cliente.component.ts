import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comuna, Region } from 'src/app/interfaces/ciudades.interface';
import { Direccion } from 'src/app/interfaces/cliente.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  selector: 'app-direcciones-cliente',
  templateUrl: './direcciones-cliente.component.html',
  styleUrls: ['./direcciones-cliente.component.css']
})
export class DireccionesClienteComponent implements OnInit {

  public DirClienteForm: FormGroup = this.fb.group({});
  public direcciones: Direccion[] = [];
  public regiones: Region[] = [];
  public comunas: Comuna[] = [];

  @Input() idClient = 0;

  @Output() cerrar = new EventEmitter<boolean>();

  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  p: number = 1;

  buildForm(data:any){
    this.DirClienteForm = this.fb.group({
     direccion_id:[data.direccion_id],
     region_id:[data.region_id,Validators.required],
     comuna_id:[data.comuna_id,Validators.required],
     direccion:[data.direccion,Validators.required],
     descripcion:[data.descripcion,Validators.required],
   });
 }

  constructor(
    private fb:FormBuilder,
    private address:ClienteService,
    private city:CiudadesService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.DirClienteForm ? this.DirClienteForm : '');
    this.ocultarRegistro = true;
    this.getDirCliente(this.idClient);
    this.getRegiones();
  }

  getRegiones(){
    this.city.getRegiones()
    .subscribe(region => {
      console.log(region)
      this.regiones = region
    })
  }

  getComunas(dato:any){
    this.city.getComunasByRegion(dato.value)
    .subscribe(comuna => {
      this.comunas = comuna
    })
  }

  getDirCliente(id:number){
    this.address.getDireccionesCliente(id)
    .subscribe(addr =>{
     this.direcciones = addr
    })
  }


  guardarDireccion(){

  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

}
