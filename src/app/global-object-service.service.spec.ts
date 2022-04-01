import { TestBed } from '@angular/core/testing';

import { GlobalObjectServiceService } from './global-object-service.service';

describe('GlobalObjectServiceService', () => {
  let service: GlobalObjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalObjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
