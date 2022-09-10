import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPrefacturaComponent } from './modal-prefactura/modal-prefactura.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalAsignaConductorComponent } from './modal-asigna-conductor/modal-asigna-conductor.component';
import { ModalAsignaVehiculoComponent } from './modal-asigna-vehiculo/modal-asigna-vehiculo.component';




@NgModule({
  declarations: [
    ModalDetalleComponent,
    ModalPrefacturaComponent,
    ModalAsignaConductorComponent,
    ModalAsignaVehiculoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[
    ModalDetalleComponent,
    ModalPrefacturaComponent
  ],
  providers:[
    DecimalPipe
  ]
})
export class SharedUiModule { }
