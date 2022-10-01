import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'src/app/services/subirArchivo.service';
import { TarifadespachoService } from 'src/app/services/tarifadespacho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imagen-vehiculo',
  templateUrl: './imagen-vehiculo.component.html',
  styleUrls: ['./imagen-vehiculo.component.css']
})
export class ImagenVehiculoComponent implements OnInit {

  public imagenSubir: any = null;
  public imgTemp: any = null;

  @Input() idVehiculo = 0;
  @Output() cerrar = new EventEmitter<boolean>();

  constructor(
    private upload:FileUploadService
  ) { }

  ngOnInit(): void {
    console.log(this.idVehiculo);
  }

  cerrarModal():void{
    this.cerrar.emit(false);
  }

  
  getFile($event:any):void{
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;

    this.imagenSubir = file;
   
  }

 
  subirImagen(){
    this.upload
      .actualizarFoto( this.imagenSubir, 'vehiculos', this.idVehiculo )
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
