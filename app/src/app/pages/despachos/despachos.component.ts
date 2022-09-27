import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Conductor } from 'src/app/interfaces/conductor.interface';
import { Despacho } from 'src/app/interfaces/despacho.interafece';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { Puerto } from 'src/app/interfaces/puerto.interface';


import { ClienteService } from 'src/app/services/cliente.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { DespachoService } from 'src/app/services/despacho.service';
import { DetalleService } from 'src/app/services/detalle.service';

import { PuertoService } from 'src/app/services/puerto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})

export class DespachosComponent implements OnInit {

  public clientes: Cliente[] = [];
  public conductores: Conductor[] = [];
  public despachos: Despacho[] = [];
  public puertos: Puerto[] = [];
  public direcciones: Direccion[] = [];
  public page: number = 0;
  public buscar: string = '';
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public ocultarModalDetalle : boolean = false;
  public idDetalle: number = 0;
  public idCliente: number = 0;
  public guia: string = '';
  public ngSelectPuerto = 0;
  public ngSelectConductor = 0;
  public ngSelectCliente = 0;

  p: number = 1;

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
    estado: ''
  }

 
  public despachoForm = this.fb.group({
    guia:['',Validators.required],
    descripcion:['',Validators.required],
    nave:['',Validators.required],
    puerto:['',Validators.required],
    conductor:['',Validators.required],
    cliente:['',Validators.required]
  });
 

  constructor(
    private despacho:DespachoService,
    private puerto:PuertoService,
    private conductor:ConductorService,
    private cliente:ClienteService,
    private detalle:DetalleService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.ocultarRegistro = true;
    this.getDespachos();
    this.getPuertos();
    this.getConductor();
    this.getCliente();

  }

  goToLoadModal(evento:boolean,despacho:number,cliente:number,guia:string){

    this.ocultarModalDetalle = evento;
    this.idDetalle = despacho;
    this.idCliente = cliente;
    this.guia = guia;
  }
 
  getCliente(){
    this.cliente.getClientes().subscribe(
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
    this.despacho.GetDespachosByEstado('Proceso').subscribe(
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
    if(this.despachoForm.invalid){
      Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      }).fire({
        title: 'Campo requerido ',
        text: 'Debe ingresar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
        reverseButtons: true
      })
    }else{
      this.despacho.CreaDespacho(this.Despacho)
    .subscribe( despacho =>{
      
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: 'El Despacho se creo exitosamente'
      })
      
      this.getDespachos();
      this.LimpiarCampos();

    });
    }


  }

  actualizaDespacho(){
    this.ocultarEditar = false;
    this.ocultarRegistro = true;

    this.despacho.EditaDespacho(this.Despacho.id,this.Despacho)
    .subscribe((despacho) =>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'El Despacho se Edito exitosamente'
      })
      

      this.getDespachos();
      this.LimpiarCampos();
    });

  }

  finalizarDespacho(despacho:Despacho){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Finalizara el Despacho N° ${despacho.despacho_id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Finalizar'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          `Despacho N° ${despacho.numero} ha sido Finalizado`,
          '',
          'success'
        )
        despacho.estado = 'Finalizado';
        this.Detalle.estado = 'Despachado';
        this.detalle.EditaEstado(despacho.despacho_id,this.Detalle)
        .subscribe(detail =>{
          console.log(detail)
        })
        this.despacho.EditaDespacho(despacho.despacho_id,despacho)
        .subscribe((despacho) =>{
          this.getDespachos();
        });
        
      }
    })

  }

  editarDespacho(despacho:Despacho){
    this.ocultarEditar = true;
    this.ocultarRegistro = false;

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

  
  LimpiarCampos(){
    this.Despacho.id = 0;
    this.Despacho.numero = '';
    this.Despacho.descripcion = '';
    this.Despacho.nave = '';
    this.ngSelectPuerto = 0;
    this.ngSelectConductor = 0;
    this.ngSelectCliente = 0;
   
  }


 

}
