import { TestBed } from '@angular/core/testing';

import { ExtraUpdateService } from './extra-Update.service';

describe('ExtraCUDService', () => {
  let service: ExtraUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
