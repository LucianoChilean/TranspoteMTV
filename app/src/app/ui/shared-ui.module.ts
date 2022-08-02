import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ModalDetalleComponent
  ]
})
export class SharedUiModule { }
