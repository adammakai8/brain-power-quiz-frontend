import { TestBed } from '@angular/core/testing';

import { ReverseGuard } from './reverse.guard';

describe('ReverseGuard', () => {
  let guard: ReverseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReverseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
