import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';



// Modulos
//import { SharedModule } from '../shared/shared.module';
//import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
  LoginComponent,
  ForgetComponent
  ],
  exports: [
  LoginComponent,
  ForgetComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
   
  ]
})
export class AuthModule { }
