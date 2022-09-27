import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPrefacturaComponent } from './modal-prefactura/modal-prefactura.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalAsignaConductorComponent } from './modal-asigna-conductor/modal-asigna-conductor.component';
import { ModalAsignaVehiculoComponent } from './modal-asigna-vehiculo/modal-asigna-vehiculo.component';
import { ImagenVehiculoComponent } from './imagen-vehiculo/imagen-vehiculo.component';
import { PerfilVehiculoComponent } from './perfil-vehiculo/perfil-vehiculo.component';
import { PerfilConductorComponent } from './perfil-conductor/perfil-conductor.component';
import { ModalModulosComponent } from './modal-modulos/modal-modulos.component';
import { TarifasClienteComponent } from './tarifas-cliente/tarifas-cliente.component';
import { DireccionesClienteComponent } from './direcciones-cliente/direcciones-cliente.component';




@NgModule({
  declarations: [
    ModalDetalleComponent,
    ModalPrefacturaComponent,
    ModalAsignaConductorComponent,
    ModalAsignaVehiculoComponent,
    ImagenVehiculoComponent,
    PerfilVehiculoComponent,
    PerfilConductorComponent,
    ModalModulosComponent,
    TarifasClienteComponent,
    DireccionesClienteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[
    ModalDetalleComponent,
    ModalPrefacturaComponent,
    ImagenVehiculoComponent,
    ModalModulosComponent,
    ModalAsignaConductorComponent,
    ModalAsignaVehiculoComponent,
    PerfilConductorComponent,
    PerfilVehiculoComponent,
    TarifasClienteComponent,
    DireccionesClienteComponent
  ],
  providers:[
    DecimalPipe
  ]
})
export class SharedUiModule { }
