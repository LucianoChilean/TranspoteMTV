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



// Modulos
//import { SharedModule } from '../shared/shared.module';
//import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    DespachosComponent,
    UsuariosComponent,
    FiltroPipe,
    FacturasComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    DespachosComponent,
    UsuariosComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
   
  ]
})
export class PagesModule { }
