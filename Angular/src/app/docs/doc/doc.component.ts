import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';
import { Docs } from '../../models/docs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit, OnDestroy {
  document: Docs;
  private _docSubscribe: Subscription;

  constructor(
    private docsService: DocsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._docSubscribe = this.docsService.currentDoc
      .pipe(
        startWith({
          id: '',
          doc: 'Seleccione o cree un nuevo documento',
          salaNombre: '',
          roomPassword: '',
        })
      )
      .subscribe(document => (this.document = document));
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
  }

  editDoc() {
    this.docsService.editDoc(this.document);
  }
  goDocsList() {
    this.router.navigate(['/docs/docs_list']);
  }
}
