import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Rol } from 'src/app/interfaces/usuario.interface';
import { Form, FormBuilder, Validators,FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public roles: Rol[] = [];
  p: number= 1;
  public ocultarEditar : boolean = false;
  public ocultarRegistro : boolean = false;
  public ocultarModalModulo: boolean = false;
  public idRol: number = 0;
  public rolesForm: FormGroup = this.fb.group({});
  public array_rol = {
    rol_id: 0,
    nombre: '',
    descripcion: '',
  }

  buildForm(data:any){
     this.rolesForm = this.fb.group({
      rol_id:[data.rol_id],
      nombre:[data.nombre,Validators.required],
      descripcion:[data.descripcion,Validators.required],
    });
  
  }
  
  constructor(
    private rol:UsuarioService,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this.buildForm(this.rolesForm ? this.rolesForm : '');
    this.ocultarRegistro = true;
    this.getRoles();
  }

  goToLoadModal(evento:boolean,rol:number){

    this.ocultarModalModulo = evento;
    this.idRol = rol;

  }

  getRoles(){
    this.rol.getRoles()
    .subscribe(rols =>{
      this.roles = rols
    });
  }

  setRol(){

    if(this.rolesForm.invalid){
      Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      }).fire({
        title: 'Campo requerido ',
        text: 'Debe ingresar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
        reverseButtons: true
      })
    }else{

      this.rol.setRol(this.rolesForm.value)
      .subscribe( ROL =>{
        this.getRoles();
        Swal.mixin({toast: true,position: 'bottom-end',showConfirmButton: false,
        timer: 3000,timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: 'El Rol se creo exitosamente'
      })
    
      });

    }

   
  }

  updateRol(){

    this.rol.putRol(this.rolesForm.value.rol_id,this.rolesForm.value)
    .subscribe(ROl=>{
      this.getRoles();
    })

  }

  getRolActual(array_rol:Rol){

    this.ocultarRegistro = false;
    this.ocultarEditar = true;

    this.buildForm(array_rol);

  }

  cancelEdit(){
    this.ocultarRegistro = true;
    this.ocultarEditar = false;
    this.buildForm(this.rolesForm ? this.rolesForm : '');
  }

  deleteRol(id:number){

    Swal.fire({
      title: 'Esta seguro?',
      text:  `Eliminara Rol`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire(
          `Rol Eliminado`,
          '',
          'success'
        )
        this.rol.deleteRol(id)
        .subscribe(ROL =>{
          this.getRoles();
        });
      }
    })

  }

}
