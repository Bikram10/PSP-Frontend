import { TestBed } from '@angular/core/testing';

import { ProductupdateService } from './productupdate.service';

describe('ProductupdateService', () => {
  let service: ProductupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
