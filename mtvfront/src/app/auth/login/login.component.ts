import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public loginForm = this.fb.group({
    email: ['mattensohn64@gmail.com' || '', [Validators.required,Validators.email]] || '',  
    password: ['Iron0210' || '', [Validators.required]] || ''
  });

  constructor(
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private router: Router
  ){

   }

  Login(){

    const formulario = {email:this.loginForm.value.email || '',
    password:this.loginForm.value.password || ''};
   


    this.usuarioService.Login(formulario).subscribe(
      resp =>{
        localStorage.setItem('token',resp.token)
        this.router.navigate(['dashboard/despachos']);
      })
   
     
    
  }

}
