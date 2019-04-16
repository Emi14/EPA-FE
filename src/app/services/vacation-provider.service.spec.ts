/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VacationProviderService } from './vacation-provider.service';
import { AppModule } from '../app.module';

describe('Service: VacationProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
  });

  it('should create', inject([VacationProviderService], (service: VacationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
