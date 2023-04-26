import { TestBed } from '@angular/core/testing';

import { ForumcommentService } from './forumcomment.service';

describe('ForumcommentService', () => {
  let service: ForumcommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumcommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
