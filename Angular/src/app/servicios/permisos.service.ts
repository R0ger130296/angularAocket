import { Injectable } from '@angular/core';
import { Usuarios } from '../modelos/usuarios';
import { DataRx } from '../modelos/data-rx';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  datarx:DataRx;
  private token: string;
  private userLogin:Usuarios;
  private sessionID:string;

  constructor() {
    this.token= null;
    this.userLogin=null;
  }
decodificarToken(token:string):boolean{
  const decoded = jwt_decode(token);
  if(decoded){
    this.token||null;
    this.userLogin=decoded.data||null;
    this.sessionID=this.userLogin.sessionID||null;
    delete this.userLogin.sessionID;
    delete this.userLogin.passw;
    return true;
  }else{
    return false;
  }
}


getToken():any{
return this.token;
}
deleteToken():void{
  this.token=null;
}
getUsuarioLogin():object{
  return this.userLogin;
}
getSessionId():string{
  return this.sessionID;
}
}
