import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocsService } from '../../servicios/docs.service';
import { PermisosService } from '../../servicios/permisos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit ,OnDestroy{
  docs: Observable<string[]>;
  currentDoc: string;
  docAuth: any;
  private _docSubscribe: Subscription;
  constructor(private docsService: DocsService, 
    private router: Router,
    private servicesPermisos: PermisosService) { }

  ngOnInit(): void {
    this.docs = this.docsService.documents;
    this._docSubscribe = this.docsService.dataActual.subscribe(
      (doc) => ((this.currentDoc = doc.id), (this.docAuth = doc))
    );
  }
ngOnDestroy(){
  this._docSubscribe.unsubscribe();
} 

getDoc(id: string) {
  this.docsService.getDoc(id);

  let roomName = prompt('Access name');

  if (this.docAuth.roomName === roomName) {
    let roomPassword = prompt('Room password');

    if (this.docAuth.roomPassword === roomPassword) {
      this.docsService.getDoc(id);
    } else {
      alert('constraseña Incorrecta');
    }
  } else {
    alert('Noexiste esta sala?');
  }
}

addDoc() {
  let roomName = prompt('Nombre del documento?'),
    roomPassword = prompt('Password?');

  this.docsService.addDoc({
    id: '',
    doc: '',
    userName: '',
    roomName,
    roomPassword,
  });
}
}