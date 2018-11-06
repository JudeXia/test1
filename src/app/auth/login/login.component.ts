import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from '../../profile';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  users: Profile[] = [];
  isLoggedIn: boolean;
  showMessage: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {
    this.markFormTouched(this.loginForm);
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      return this.userService.login(username, password)
      .subscribe((isLogin: boolean) => {
        if (isLogin) {
          this.isLoggedIn = true;
          setTimeout(() => {
            this.router.navigate(['/main']);
            }, 500);
        } else {
          this.isLoggedIn = false;
        }
      });
    }
  }

  private markFormTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormTouched(control);
      }
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    });
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

}
