import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [  ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: FollowingService = TestBed.get(FollowingService);
    expect(service).toBeTruthy();
  });
});
