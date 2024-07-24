import { TestBed } from '@angular/core/testing';

import { ExtraDataService } from './extra-data.service';

describe('ExtraDataService', () => {
  let service: ExtraDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
