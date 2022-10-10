import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private router: Router,
    private NgZone:NgZone) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    

   const headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token') || ''
      });

      
      const reqClone = req.clone({
         headers
      });
    
    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse){
    console.log('sucedio un error');
    console.log('Registrado en el log file');
    const Error = error.error;

    console.log(Error)

   
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Error en el '+Error.type,
      text: Error.msg,
      icon: 'error',
      confirmButtonText: 'OK',
      reverseButtons: true
    })

 
   
    return throwError('error personalizado');
  }


 
}
