import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RegisterationComponent} from './registeration/registeration.component';
import {LoginComponent} from './login/login.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

import { AuthComponent } from './auth.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        RegisterationComponent,
        LoginComponent,
      ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
