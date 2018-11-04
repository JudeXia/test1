import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {MainComponent} from '../main/main.component';
import {NavigatorComponent} from '../navigator/navigator.component';
import {UserComponent} from '../main/user/user.component';
import {FollowingComponent} from '../main/following/following.component';
import {PostsComponent} from '../main/posts/posts.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigatorComponent,
        ProfileComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({
      accountName:    "xx21",
      displayName:    "Jude Xia",
      email:          "xx21@rice.edu",
      phoneNumber:    "1234567890",
      birthday:       "1994-04-10",
      zipcode:        "77005",
      avatar:         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQOka_pE2dn3ydIjhEObfhxNpByDH7EzGVs81JoME9NBge6y6",
      headline:       "I'm Jude. "
    }));
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the logged in user\'s profile information', () => {
    expect(component.user.accountName).toBe("xx21");
    expect(component.user.displayName).toBe("Jude Xia");
    expect(component.user.email).toBe("xx21@rice.edu");
    expect(component.user.phoneNumber).toBe("1234567890");
    expect(component.user.birthday).toBe("1994-04-10");
    expect(component.user.zipcode).toBe("77005");
    expect(component.user.avatar).toBe("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQOka_pE2dn3ydIjhEObfhxNpByDH7EzGVs81JoME9NBge6y6");
    expect(component.user.headline).toBe("I'm Jude. ");
  });
});
