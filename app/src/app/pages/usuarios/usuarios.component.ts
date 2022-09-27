import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  p: number = 1;
  public ocultarRegistro:boolean = false;
  public ocultarEditar:boolean = false;
  public idUsuario:number= 0;

  public usuarioForm = this.fb.group({
    usuario_id:[''],
    nombre:['',Validators.required],
    paterno:['',Validators.required],
    materno:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    cpassword:['',Validators.required],
  });

  constructor(
    private users:UsuarioService,
    private fb:FormBuilder

  ) { }

  ngOnInit(): void {

    this.ocultarRegistro = true;
    this.getUsers();

  }

  getUsers(){
    
    this.users.getUsuarios()
    .subscribe( usuario =>{
        this.usuarios = usuario;
    })
  }

  createUser(){
    if(this.usuarioForm.invalid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: 'Campo requerido ',
        text: 'Debe ingresar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
        reverseButtons: true
      })

    }else{

      
    this.users.setUsuario(this.usuarioForm.value)
    .subscribe(usuario=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'El USuario se creo exitosamente'
      })
      this.getUsers();
    });

    }


  }

  getDataUser(usuarios:Usuario){
    this.ocultarEditar = true;
    this.ocultarRegistro = false;

   
    this.usuarioForm.setValue({
      usuario_id: usuarios.usuario_id,
      nombre: usuarios.nombre,
      paterno: usuarios.paterno,
      materno: usuarios.materno,
      email: usuarios.email,
      password: ''
    })
  }

  updateUser(){

   

    this.users.putUsuario(this.usuarioForm.value.usuario_id,this.usuarioForm.value)
    .subscribe( usuario =>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'El Usuario se edito exitosamente'
      })
      this.getUsers();
      this.ocultarEditar = false;
      this.ocultarRegistro = true;
    })   

  }

  cancelUpdate(){
    this.ocultarEditar = false;
    this.ocultarRegistro = true;

    
    this.usuarioForm.setValue({
      usuario_id:'',
      nombre: '',
      paterno: '',
      materno: '',
      email: '',
      password: ''
    })
  }

  eraseUser(id:number){
    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara el detalle`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed){
        Swal.fire(
          `Detalle Eliminado`,
          '',
          'success'
        )
        this.users.deleteUsuario(id)
        .subscribe(usuario=>{
          console.log(usuario)
          this.getUsers();
        })
      }
    })

  }


}
