import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://127.0.0.1:5000/app';

  constructor(private http: HttpClient) {}

  realizarPago(data: any) {
    const payload = data;
    const headers = 
    new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json', 'Authorization': 'Access-Control-Allow-Origin'
    })
    return this.http.post(`${this.apiUrl}/insertar/pagos`, payload, {headers});
  }

  obtenerPago(id:Number): Observable<any> {
  return this.http.get(`${this.apiUrl}/ver/pagos/${id}`);
}

  obtenerPagos(): Observable<any> {
  return this.http.get(`${this.apiUrl}/especifico/pagos/`);
}

  eliminarPago(id:Number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

  actualizarPago(id:String, data: any) {
    return this.procesarPeticion('put', `${this.apiUrl}/actualizar/pagos/${id}`, data);
}

procesarPeticion(method: string, url: string, data = {}){
  
//   ;
// switch(method) {  
//   case 'get':
//     return this.http.get(url,);
//   case 'post':
//     return this.http.post(url, data,{headers});
//   case 'put':
//     return this.http.put(url, data,);
//   case 'delete':
//     return this.http.delete(url,);
//     default:
//         return null;
//     }
  }
}