import { TestBed } from '@angular/core/testing';

import { WebServicesService } from './web-services.service';

describe('WebServicesService', () => {
  let service: WebServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
