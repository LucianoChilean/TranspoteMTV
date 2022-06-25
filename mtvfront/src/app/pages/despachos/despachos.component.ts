import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Despacho } from 'src/app/interfaces/despacho.interafece';
import { DespachoService } from 'src/app/services/despacho.service';
import { DetalleService } from 'src/app/services/detalle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  public despachos: Despacho[] = [];
  public page: number = 0;
  public buscar: string = '';
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public FormText: string = '';

  public Despacho = {
    id: 0,
    numero: '',
    descripcion:'',
    nave:  ''
  }

  public desForm = this.fb.group({
   
  });



  constructor(
    private despacho:DespachoService,
    private detalle:DetalleService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

    this.ocultarEditar = false;
    this.ocultarRegistro = true;
    this.getDespachos();
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
      this.Despacho.id = 0;
      this.Despacho.numero = '';
      this.Despacho.descripcion = '';
      this.Despacho.nave = '';
    });
  
  }

  editarDespacho(despacho:Despacho){

    this.ocultarEditar = true;
    this.ocultarRegistro = false;

    this.Despacho.id =  despacho.despacho_id;
    this.Despacho.descripcion = despacho.descripcion;
    this.Despacho.nave = despacho.nave;
    this.Despacho.numero = despacho.numero;
    


  }

  eliminarDespacho(despacho:Despacho){
  
    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el Ticket N° ${despacho.despacho_id}`,
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
    this.Despacho.id = 0;
    this.Despacho.numero = '';
    this.Despacho.descripcion = '';
    this.Despacho.nave = '';

  }


  CargaDetalle(despacho:Despacho){

    this.FormText = despacho.numero;

  }
  

}
