import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente.interface';
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

  public clienteForm = this.fb.group({
    cliente_id:[''],
    rut:['',Validators.required],
    nombre:['',Validators.required],
    giro:['',Validators.required],
    direccion:['',Validators.required]
  });

  constructor(
    private client:ClienteService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.ocultarRegistro = true;
    this.getCliente();
  }

  getCliente(){
    this.client.getClientes()
    .subscribe(cliente =>{
      this.clientes = cliente;
    });

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
          title: 'El Cliente se creo exitosamente'
        })
        this.getCliente();
      });

    }

  }

  updateCliente(){
    this.client.putCliente(this.clienteForm.value.cliente_id,this.clienteForm.value)
    .subscribe(cliente =>{
      this.getCliente();
    })

  }

  getDataClient(clientes:Cliente){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.clienteForm.setValue({
      cliente_id: clientes.cliente_id,
      rut: clientes.rut,
      nombre: clientes.nombre,
      giro: clientes.giro,
      direccion: clientes.direccion
    });
  }

  cancelUpdate(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.clienteForm.setValue({
      cliente_id: '',
      rut: '',
      nombre: '',
      giro: '',
      direccion: ''
    });
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
          `Tarifa Eliminada`,
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




}
