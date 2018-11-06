import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {MainComponent} from './main/main.component';
import {NavigatorComponent} from './navigator/navigator.component';
import {UserComponent} from './main/user/user.component';
import {FollowingComponent} from './main/following/following.component';
import {PostsComponent} from './main/posts/posts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      MainComponent,
      NavigatorComponent,
      UserComponent,
      FollowingComponent,
      PostsComponent
    ],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      RouterTestingModule,
      HttpClientTestingModule
    ],
    providers: [
      UserService
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should log in a previously registered user (not new users)', () => {
    const service: UserService = TestBed.get(UserService);
    // expect(2).toBe(3);
    service.login('xx21', 'asd')
      .then(r => {
          console.log(r);
          expect(r).toBeTruthy();
        }
      );
  });

  it('should not log in an invalid user', () => {
    const service: UserService = TestBed.get(UserService);
    // expect(2).toBe(3);
    service.login('invalidUser', 'invalidPassword')
      .then(r => {
          console.log(r);
          expect(r).toBeFalsy();
        }
      );
  });
});
