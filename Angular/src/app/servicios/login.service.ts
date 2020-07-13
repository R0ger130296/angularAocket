import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServicesService } from './web-services.service';
import { PermisosService } from './permisos.service'
import { Observable } from 'rxjs';
import { DataRx } from '../modelos/data-rx'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
private url:string;
  constructor(
    private http:HttpClient,
    private servidor:WebServicesService,
    private permisos: PermisosService,
  ) {
    this.url = servidor.getUrl();
   }

   login(datalogin):Observable<DataRx>{
    return this.http.post<DataRx>(`${this.url}login`, datalogin);
   }

}