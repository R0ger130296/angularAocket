import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Documentos } from '../modelos/documentos';
import { PermisosService } from '../servicios/permisos.service'

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  dataActual = this.socket.fromEvent<Documentos>('manageData');
  documents = this.socket.fromEvent<string[]>('getData');
  constructor(private socket: SocketService,
    private permisosService: PermisosService) { }

  getDoc(id: string) {
    this.socket.emit('getDoc', id);
  }

  addDoc(doc) {

    if(this.permisosService.getToken())
    if (this.socket.ioSocket.connected) {
      this.socket.emit('addDoc', doc);
    } else {
      alert('Invalid token');
    
  }
  }

  editDoc(doc: Documentos) {
    this.socket.emit('editDoc', doc);
  }
}
