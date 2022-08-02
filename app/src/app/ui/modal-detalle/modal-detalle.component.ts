import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Detalle } from 'src/app/interfaces/detalle.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { Puerto } from 'src/app/interfaces/puerto.interface';
import { Tarifa } from 'src/app/interfaces/tarifa.interface';
import { DetalleService } from 'src/app/services/detalle.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { PuertoService } from 'src/app/services/puerto.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { TarifadespachoService } from 'src/app/services/tarifadespacho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent implements OnInit {

  public detalles: Detalle[] = [];
  public direcciones:Direccion[] = [];
  public puertos: Puerto[] = [];
  public tarifas: Tarifa[] = [];

  public ngSelectDirecciones = 0;
  public ngSelectPuerto = 0;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;

  
  @Input() idDetails = 0;
  @Input() idCliente = 0;

  @Output() cerrar = new EventEmitter<boolean>();


  public detalleForm = this.fb.group({
    descripcion: ['', Validators.required ],
    tipo: ['', [ Validators.required ]],
    peso: ['',Validators.required],
    fecha_retiro: ['',Validators.required],
    fecha_entrega: ['', Validators.required],
    puerto_id: ['',Validators.required],
    direccion_id: ['',Validators.required],
    checkArray: this.fb.array([]),
    despacho_id: ['']
  });

  constructor(
    private direccion:DireccionService,
    private detalle:DetalleService,
    private puerto:PuertoService,
    private tarifa:TarifaService,
    private tarifad:TarifadespachoService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    
    this.ocultarRegistro = true;
    this.ngSelectDirecciones = 0;
    this.ngSelectPuerto = 0;
    this.loadDet(this.idDetails);
    this.loadAddress(this.idCliente);
    this.getPuertos();
    this.getTarifas();
    
  }

  getPuertos(){
    this.puerto.GetPuertos().subscribe(
      puertos =>{
        this.puertos = puertos;
      }
    );
  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

  loadAddress(id:number){
    this.direccion.GetDireccionesCliente(id)
    .subscribe(direccion =>{
      this.direcciones = direccion;
    });
  }
  
  loadDet(id:number){
    this.detalle.GetDetalles(id)
    .subscribe(detalles =>{
      this.detalles = detalles;
    });
  }

  crearDetalle(){
    if(this.detalleForm.invalid){
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
      this.detalleForm.value.despacho_id = this.idDetails;
      this.detalle.CreaDetalle(this.detalleForm.value)
      .subscribe(detalle =>{
        this.loadDet(this.idDetails);
      });

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
      });
      Toast.fire({
        icon: 'success',
        title: 'El Detalle se creo exitosamente'
      });
    }
  }

  eliminarDetalle(detalle:Detalle){
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
          `Detalle Eliminado`,
          '',
          'success'
        )
        this.detalle.EliminaDetalle(detalle.detalle_id)
        .subscribe(detalle =>{
          this.loadDet(this.idDetails);
        });
      }
    })
  }

  getTarifas(){

    this.tarifa.GetTarifas().subscribe(
      tarifas =>{
      this.tarifas = tarifas;
    });

  }
  /*
  GuardarTarifa(){
    this.tarifaForm.value.despacho_id = this.Despacho.id;

    this.tarifaForm.value.checkArray.forEach((item:number) =>{
      this.tarifasIn.despacho_id = this.Despacho.id;
      this.tarifasIn.tarifa_id = item;
      this.tarifad.CrearTarifa(this.tarifasIn)
      .subscribe(tarifad =>{
        console.log(tarifad)
      });
    })
   
  }*/
  
 

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.detalleForm.get('checkArray') as FormArray;
    if(e.target.checked){
      checkArray.push(new FormControl(e.target.value));
    }else{
      let i: number = 0;
      checkArray.controls.forEach((item) =>{
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      })
    }
  }



  

}
