/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserProviderService } from './user-provider.service';
import { AppModule } from '../app.module';

describe('Service: UserProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
  });

  it('should create', inject([UserProviderService], (service: UserProviderService) => {
    expect(service).toBeTruthy();
  }));
});
