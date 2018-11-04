import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service).toBeTruthy();
  });
});
