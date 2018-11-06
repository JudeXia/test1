import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from '../../user.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update success message (for displaying login success message to user)', () => {
    const compiled = fixture.debugElement.nativeElement;
    const service: UserService = TestBed.get(UserService);
    service.login('xx21', 'asd')
      .then(r => {
        expect(compiled.querySelector('#successMessage').textContent).toContain('Successfully Logged In!');
      });
  });

  it('should update error message (for displaying login error mesage to user)', () => {
    const compiled = fixture.debugElement.nativeElement;
    const service: UserService = TestBed.get(UserService);
    service.login('invalidName', 'invalidPassword')
      .then(r => {
        expect(compiled.querySelector('#failMessage').textContent).toContain('Wrong Account Information!');
      });
  });


});
