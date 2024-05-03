import { TestBed } from '@angular/core/testing';

import { ExtraCUDService } from './extra-Update.service';

describe('ExtraCUDService', () => {
  let service: ExtraCUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraCUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
