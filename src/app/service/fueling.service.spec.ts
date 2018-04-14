import { TestBed, inject } from '@angular/core/testing';

import { FuelingService } from './fueling.service';

describe('FuelingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuelingService]
    });
  });

  it('should be created', inject([FuelingService], (service: FuelingService) => {
    expect(service).toBeTruthy();
  }));
});
