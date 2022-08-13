import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { Tarifa } from 'src/app/interfaces/tarifa.interface';
import { TarifaService } from 'src/app/services/tarifa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {

  public tarifas: Tarifa[] = [];
  p: number = 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  public tarifasForm = this.fb.group({
    tarifa_id:[''],
    nombre:['',[Validators.required,Validators.pattern("/^[a-zA-Z ]+$/")]],
    descripcion:['',Validators.required],
    regla:['',Validators.required],
    costo:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    valor_interno:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
    valor_externo:['',[Validators.required,Validators.pattern("^[0-9]*$")]]
  });

  constructor(
    private tarifa:TarifaService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.ocultarRegistro = true;
    this.getTarifas();
  }

  getTarifas(){
    this.tarifa.getTarifas()
    .subscribe( tarifa =>
      {
        this.tarifas = tarifa;
    }
    );
  }

  createTarifa(){

    if(this.tarifasForm.invalid){

      if(this.tarifasForm.get('nombre')?.invalid || this.tarifasForm.value){
        let value = "Campo nombre solo permite texto y es requerido";
        this.requireInput(value);
       
      }

    }else{
      this.tarifa.createTarifa(this.tarifasForm.value)
      .subscribe(tarifa =>{

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
        title: 'El Despacho se creo exitosamente'
      })
      this.getTarifas();
      //this.tarifaValues([]);
      console.log(tarifa)
    })
    }

  }

  requireInput(value:string){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Error ',
      text: value,
      icon: 'error',
      confirmButtonText: 'OK',
      reverseButtons: true
    })

  }

  updateTarifa(){
    this.tarifa.updateTarifa(this.tarifasForm.value.tarifa_id,this.tarifasForm.value)
    .subscribe(tarifa =>{
      this.getTarifas();
    })
  }

  editTarifa(tarifas:Tarifa){
  
    this.tarifaValues(tarifas);

  }

  cancelUpdate(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;

    this.tarifasForm.setValue({
      tarifa_id: '',
      nombre : '',
      descripcion: '',
      regla: '',
      costo : '',
      valor_interno: '',
      valor_externo: ''
    });

  }

  tarifaValues(tarifas:Tarifa){
    this.ocultarRegistro = false;
    this.ocultarEditar = true;
    this.tarifasForm.setValue({
      tarifa_id: tarifas.tarifa_id,
      nombre : tarifas.nombre,
      descripcion: tarifas.descripcion,
      regla: tarifas.regla,
      costo : tarifas.costo,
      valor_interno: tarifas.valor_interno,
      valor_externo: tarifas.valor_externo
    });
  }

  deleteTarifa(id:number){

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
       
    this.tarifa.deleteTarifa(id)
    .subscribe(tarifa =>{
      this.getTarifas();
    })
      }
    })


  }



}
