import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

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
    console.warn(error);
    return throwError('error personalizado');
  }

  constructor() { }
}
