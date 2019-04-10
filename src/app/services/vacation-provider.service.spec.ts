/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacationProviderService } from './vacation-provider.service';

describe('Service: VacationProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacationProviderService]
    });
  });

  it('should ...', inject([VacationProviderService], (service: VacationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
