import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DespachosComponent } from './despachos/despachos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { TarifaComponent } from './tarifa/tarifa.component';
import { ConductorComponent } from './conductor/conductor.component';
import { ClienteComponent } from './cliente/cliente.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { PuertoComponent } from './puerto/puerto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { RolesComponent } from './roles/roles.component';




const routes: Routes = [
    { 
        path: 'Dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'Despachos', component: DespachosComponent, data: { titulo: 'Despachos' }},
            { path: 'Usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            { path: 'PreFacturas', component: FacturasComponent, data: { titulo: 'Facturas' }},
            { path: 'Facturacion', component: FacturacionComponent, data: { titulo: 'Facturacion' }},
            { path: 'Tarifas', component: TarifaComponent, data: { titulo: 'Tarifa' }},
            { path: 'Conductor', component: ConductorComponent, data: { titulo: 'Conductor' }},
            { path: 'Clientes', component: ClienteComponent, data: { titulo: 'Cliente' }},
            { path: 'Vehiculos', component: VehiculosComponent, data: { titulo: 'Vehiculos' }},
            { path: 'Puertos', component: PuertoComponent, data: { titulo: 'Puerto' }},
            { path: 'Proveedores', component: ProveedorComponent, data: {titulo: 'Proveedores'}},
            { path: 'Roles', component: RolesComponent, data : {titulo:'Roles'}},
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}