import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorComponent } from './navigator.component';
import {ProfileComponent} from '../profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NavigatorComponent', () => {
  let component: NavigatorComponent;
  let fixture: ComponentFixture<NavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigatorComponent,
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
    fixture = TestBed.createComponent(NavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out a user (login state should be cleared)', () => {
    localStorage.setItem('currentUser', JSON.stringify({
      userId:         1,
      accountName:    "xx21",
      displayName:    "Jude Xia",
      email:          "xx21@rice.edu",
      phoneNumber:    "1234567890",
      birthday:       "1994-04-10",
      zipcode:        "77005",
      password:       "asd",
      avatar:         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQOka_pE2dn3ydIjhEObfhxNpByDH7EzGVs81JoME9NBge6y6",
      headline:       "I'm Jude. "
    }));
    expect(localStorage.getItem('currentUser')).toBeDefined();
    component.logout();
    expect(localStorage.getItem('currentUser')).toBeNull();

  });
});
