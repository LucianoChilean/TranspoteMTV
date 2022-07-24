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
    password: ['123456' || '', [Validators.required]] || ''
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

        let timerInterval:any;
        Swal.fire({
        title: 'Ingresando al Sistema',
        icon: 'success',
        timer: 2000,
        didOpen: () => {
          Swal.showLoading()
        
          timerInterval = setInterval(() => {
      
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
             this.router.navigate(['dashboard']);
        }
      })

    
      })
   
     
    
  }

}
