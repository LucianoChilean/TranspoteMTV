import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DespachosComponent } from './despachos/despachos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { FiltroPipe } from './despachos/pipes/filtro.pipe';
import { FacturasComponent } from './facturas/facturas.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { TarifaComponent } from './tarifa/tarifa.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ConductorComponent } from './conductor/conductor.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { SharedUiModule } from '../ui/shared-ui.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PuertoComponent } from './puerto/puerto.component';




@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    DespachosComponent,
    UsuariosComponent,
    FiltroPipe,
    FacturasComponent,
    FacturacionComponent,
    TarifaComponent,
    ClienteComponent,
    ConductorComponent,
    VehiculosComponent,
    PuertoComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    DespachosComponent,
    UsuariosComponent,
  ],
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    SharedUiModule,
    NgxPaginationModule
   
  ]
})
export class PagesModule { }
