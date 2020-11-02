import { TestBed } from '@angular/core/testing';

import { PaviAdminService } from './pavi-admin.service';

describe('PaviAdminService', () => {
  let service: PaviAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaviAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
