import { Injectable } from '@angular/core';
import { PermisosService } from './permisos.service'
import { HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class WebServicesService {
  private url: string;

  constructor(
    private persimosService:PermisosService
  ) { this.url='http://localhost:3000/api/'}

  getUrl(): string {
    return this.url;
  }

  getHeaders(): object {
    const optionsHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.persimosService.getToken(),
      }),
    };
    return optionsHeaders;
  }
}
