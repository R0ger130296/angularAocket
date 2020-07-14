import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PermissionsService } from './permissions.service';

@Injectable()
export class SocketJwtService extends Socket {
  constructor(private permisos: PermissionsService) {
    // const token = sessionStorage.getItem('token');
    super({
      url: 'http://localhost:3500',
      options: {
        query: `token=${permisos.getToken()}&sessionID=${permisos.getSessionID()}`,
      },
    });
  }
}
