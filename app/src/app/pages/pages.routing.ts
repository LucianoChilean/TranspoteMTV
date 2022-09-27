import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//import { AuthGuard } from '../guards/auth.guard';

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
        path: 'dashboard', 
        component: PagesComponent,
        //canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'despachos', component: DespachosComponent, data: { titulo: 'Despachos' }},
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            { path: 'facturas', component: FacturasComponent, data: { titulo: 'Facturas' }},
            { path: 'facturacion', component: FacturacionComponent, data: { titulo: 'Facturacion' }},
            { path: 'tarifa', component: TarifaComponent, data: { titulo: 'Tarifa' }},
            { path: 'conductor', component: ConductorComponent, data: { titulo: 'Conductor' }},
            { path: 'cliente', component: ClienteComponent, data: { titulo: 'Cliente' }},
            { path: 'vehiculos', component: VehiculosComponent, data: { titulo: 'Vehiculos' }},
            { path: 'tarifa', component: TarifaComponent, data: { titulo: 'Tarifa' }},
            { path: 'puerto', component: PuertoComponent, data: { titulo: 'Puerto' }},
            { path: 'proveedores', component: ProveedorComponent, data: {titulo: 'Proveedores'}},
            { path: 'roles', component: RolesComponent, data : {titulo:'Roles'}},
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}