/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserProviderService } from './user-provider.service';

describe('Service: UserProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProviderService]
    });
  });

  it('should ...', inject([UserProviderService], (service: UserProviderService) => {
    expect(service).toBeTruthy();
  }));
});
