import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ModalDetalleComponent } from './modal-detalle/modal-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPrefacturaComponent } from './modal-prefactura/modal-prefactura.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfilVehiculoComponent } from './perfil-vehiculo/perfil-vehiculo.component';
import { PerfilConductorComponent } from './perfil-conductor/perfil-conductor.component';
import { ModalModulosComponent } from './modal-modulos/modal-modulos.component';
import { TarifasClienteComponent } from './tarifas-cliente/tarifas-cliente.component';
import { DireccionesClienteComponent } from './direcciones-cliente/direcciones-cliente.component';
import { ModalFacturaComponent } from './modal-factura/modal-factura.component';
import { ModalFlotaComponent } from './modal-flota/modal-flota.component';
import { ModalRutIngresoComponent } from './modal-rut-ingreso/modal-rut-ingreso.component';




@NgModule({
  declarations: [
    ModalDetalleComponent,
    ModalPrefacturaComponent,
    PerfilVehiculoComponent,
    PerfilConductorComponent,
    ModalModulosComponent,
    TarifasClienteComponent,
    DireccionesClienteComponent,
    ModalFacturaComponent,
    ModalFlotaComponent,
    ModalRutIngresoComponent,
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
    ModalModulosComponent,
    PerfilConductorComponent,
    PerfilVehiculoComponent,
    TarifasClienteComponent,
    DireccionesClienteComponent,
    ModalFacturaComponent,
    ModalFlotaComponent,
    ModalRutIngresoComponent
  ],
  providers:[
    DecimalPipe
  ]
})
export class SharedUiModule { }
