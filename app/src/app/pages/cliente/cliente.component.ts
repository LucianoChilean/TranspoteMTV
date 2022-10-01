import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comuna, Region } from 'src/app/interfaces/ciudades.interface';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: Cliente[] = [];
  p: number = 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public ocultarModalTarifa: boolean = false;
  public ocultarModalDirecciones: boolean = false;
  public regiones: Region[] = [];
  public comunas: Comuna[] = [];
  public idClient = 0;
  public clienteForm = this.fb.group({});


  buildForm(data:any){
    this.clienteForm = this.fb.group({
      cliente_id:[''],
      rut:[data.rut,Validators.required],
      nombre:[data.nombre,Validators.required],
      giro:[data.giro,Validators.required],
      direccion:[data.direccion,Validators.required],
      contacto:[data.contacto,Validators.required],
      mail:[data.mail,Validators.required],
      region_id:[data.region_id,Validators.required],
      comuna_id:[data.comuna_id,Validators.required],
    });
  }

 

  constructor(
    private client:ClienteService,
    private city:CiudadesService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm(this.clienteForm ? this.clienteForm : '');
    this.ocultarRegistro = true;
    this.getCliente();
    this.getRegiones();
  }

  getCliente(){
    this.client.getClientes()
    .subscribe(cliente =>{
      console.log(cliente)
      this.clientes = cliente;
    });

  }

  getRegiones(){
    this.city.getRegiones()
    .subscribe(region => {
      this.regiones = region
    })
  }

  getComunas(dato:any){
    this.city.getComunasByRegion(dato.value)
    .subscribe(comuna => {
      this.comunas = comuna
    })
  }

  setCliente(){

    if(this.clienteForm.invalid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: 'Campo requerido ',
        text: 'Debe ingresar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
        reverseButtons: true
      })
    }else{

      this.client.setCliente(this.clienteForm.value)
      .subscribe(cliente => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
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
          title: 'El Cliente se creo exitosamente'
        })
        this.getCliente();
        this.buildForm('');
      });

    }

  }

  updateCliente(){
    this.client.putCliente(this.clienteForm.value.cliente_id,this.clienteForm.value)
    .subscribe(cliente =>{
      Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: 'El Cliente se creo exitosamente'
      })

      this.getCliente();
      this.buildForm('');
    })

  }

  getDataClient(clientes:Cliente){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.buildForm(clientes);
  }

  cancelUpdate(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.buildForm('');
  }

  eraseCliente(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el detalle`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          `Cliente Eliminado`,
          '',
          'success'
        )
        this.client.deleteCliente(id)
        .subscribe(cliente =>{
          this.getCliente();
        });
      }
    })

  }

  goToLoadModalTarifa(evento:boolean,rol:number){

    this.ocultarModalTarifa = evento;
    this.idClient = rol;

  }

  goToLoadModalDirecciones(evento:boolean,rol:number){

    this.ocultarModalDirecciones = evento;
    this.idClient = rol;

  }




}
