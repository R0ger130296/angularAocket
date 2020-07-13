import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentoComponent } from './documento/documento.component';
import { DocListComponent } from './doc-list/doc-list.component';
import { DocumentosComponent } from './documentos.component';


import { SocketIoModule } from 'ngx-socket-io';
import { WebServicesService } from '../servicios/web-services.service';
@NgModule({
  declarations: [DocumentosComponent,DocumentoComponent, DocListComponent],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    FormsModule,
    SocketIoModule
  ],
  providers:[WebServicesService]
})
export class DocumentosModule { }
