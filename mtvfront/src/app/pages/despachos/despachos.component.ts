import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { Despacho } from 'src/app/interfaces/despacho.interafece';
import { Detalle } from 'src/app/interfaces/detalle.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { Puerto } from 'src/app/interfaces/puerto.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { DespachoService } from 'src/app/services/despacho.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { PuertoService } from 'src/app/services/puerto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  public direcciones: Direccion[] = [];
  public detalles: Detalle[] = [];
  public clientes: Cliente[] = [];
  public conductores: Conductor[] = [];
  public despachos: Despacho[] = [];
  public puertos: Puerto[] = [];
  public page: number = 0;
  public buscar: string = '';
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public FormText: string = '';
  public ngSelectPuerto = 0;
  public ngSelectConductor = 0;
  public ngSelectCliente = 0;

  public Despacho = {
    id: 0,
    numero: '',
    descripcion:'',
    nave:  '',
    puerto_id: 0,
    conductor_id: 0,
    cliente_id: 0
  }

  public Detalle = {
    id: 0,
    descripcion: '',
    tipo: '',
    peso: '',
    fecha_retiro: '2022-06-28 08:00:19',
    tarjeton: '',
    fecha_entrega:'2022-06-28 08:00:19',
    despacho_id: 0,
    puerto_id: 0,
    direccion_id: 0
  
  }
 

  public desForm = this.fb.group({
   
  });



  constructor(
    private despacho:DespachoService,
    private detalle:DetalleService,
    private puerto:PuertoService,
    private conductor:ConductorService,
    private cliente:ClienteService,
    private direccion:DireccionService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.ocultarEditar = false;
    this.ocultarRegistro = true;
    this.getDespachos();
    this.getPuertos();
    this.getConductor();
    this.getCliente();

  }

  getCliente(){
    this.cliente.GetClientes().subscribe(
      clientes =>{
        this.clientes = clientes;
      }
    );
  }

  getConductor(){
    this.conductor.GetConductores().subscribe(
      conductores =>{
       this.conductores = conductores;
      }
    );
  }

  getPuertos(){
    this.puerto.GetPuertos().subscribe(
      puertos =>{
        this.puertos = puertos;
      }
    );
  }

  getDespachos(){

    this.despacho.GetDespachos().subscribe(
      despachos =>{
        this.despachos = despachos;
      }
    );

  }

  nextPage(){
    this.page += 5;
  }

  prevPage(){
    if(this.page > 0)
    this.page -= 5;
  }

  buscarDespacho(buscar:string){
    this.page = 0;
    this.buscar = buscar;
    
  }

  crearDespacho(){
    
    this.despacho.CreaDespacho(this.Despacho)
    .subscribe( despacho =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `El Despacho se creo exitosamente`,
        showConfirmButton: false,
        timer: 1500
      })
      
      this.getDespachos();
      this.LimpiarCampos();

    });
  }

  actualizaDespacho(){
    console.log(this.Despacho)

    this.ocultarEditar = false;
    this.ocultarRegistro = true;

    this.despacho.EditaDespacho(this.Despacho.id,this.Despacho)
    .subscribe((despacho) =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Despacho Editado`,
        showConfirmButton: false,
        timer: 1500
      })
      
      this.getDespachos();
      this.LimpiarCampos();
    });
  
  }

  editarDespacho(despacho:Despacho){

    this.ocultarEditar = true;
    this.ocultarRegistro = false;

    console.log(despacho);

    this.Despacho.id =  despacho.despacho_id;
    this.Despacho.descripcion = despacho.descripcion;
    this.Despacho.nave = despacho.nave;
    this.Despacho.numero = despacho.numero;
    this.ngSelectPuerto = despacho.Puerto.puerto_id;
    this.ngSelectConductor = despacho.conductor.conductor_id;
    this.ngSelectCliente = despacho.Cliente.cliente_id;
  
    
  }

  eliminarDespacho(despacho:Despacho){
  
    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el Despacho N° ${despacho.despacho_id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire(
          `Despacho N° ${despacho.numero} Eliminado`,
          '',
          'success'
        )
        this.despacho.EliminaDespacho(despacho.despacho_id)
        .subscribe(despacho=>{
          this.getDespachos();
        })
      }
    })
  }

  cancelarUpdate(){

    this.ocultarEditar = false;
    this.ocultarRegistro = true;
    this.LimpiarCampos();

  }


  CargaDetalle(idDespacho:number,idCliente:number,NGuia:string){

    this.FormText = NGuia;
    this.Detalle.despacho_id = idDespacho;

    this.Despacho.cliente_id = idCliente;
    this.Despacho.id = idDespacho;
    this.Despacho.numero = NGuia;


    this.direccion.GetDirecciones(idCliente)
    .subscribe(direcciones =>{
      this.direcciones = direcciones;
    })

    this.detalle.GetDetalles(idDespacho)
    .subscribe(detalles =>{
      this.detalles = detalles;
    });

  }

  LimpiarCampos(){
    this.Despacho.id = 0;
    this.Despacho.numero = '';
    this.Despacho.descripcion = '';
    this.Despacho.nave = '';
    this.ngSelectPuerto = 0;
    this.ngSelectConductor = 0;
    this.ngSelectCliente = 0;
   

  }

  crearDetalle(){

    console.log(this.Despacho);
    
    this.detalle.CrearDetalle(this.Detalle)
    .subscribe(detalle =>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `El detalle se creo exitosamente`,
        showConfirmButton: false,
        timer: 1500
      });
        this.CargaDetalle(this.Despacho.id,this.Despacho.cliente_id,this.Despacho.numero);
    });

  }

  CierreGuia(){
    this.LimpiarCampos();
  }

  EliminarGuia(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el detalle`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire(
          `se ha Eliminado el detalle`,
          '',
          'success'
        )
        this.detalle.EliminarDetalle(id)
        .subscribe(despacho=>{
          this.CargaDetalle(this.Despacho.id,this.Despacho.cliente_id,this.Despacho.numero);
        })
      }
    })
  }
  

}
