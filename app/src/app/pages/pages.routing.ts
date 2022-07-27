import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DespachosComponent } from './despachos/despachos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FacturacionComponent } from './facturacion/facturacion.component';



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
        
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}