import { TestBed } from '@angular/core/testing';

import { UploadPhotosService } from './upload-photos.service';

describe('UploadPhotosService', () => {
  let service: UploadPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
