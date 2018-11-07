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
  messageText: String;
  messageClass: String;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {
    this.markFormTouched(this.loginForm);
    this.showMessage = false;
    this.messageText = '';
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      return this.userService.login(username, password)
      .subscribe(
        isLogin => {
        if (isLogin) {
          this.isLoggedIn = true;
          this.showMessage = true;
          this.messageText = 'Welcome, ' + username;
          this.messageClass = 'text-success';
          setTimeout(() => {
            this.router.navigate(['/main']);
            }, 1000);
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        // console.log(error.status)
        if (error.status === 401) {
          this.showMessage = true;
          this.messageText = 'Wrong Username or Password!';
          this.messageClass = 'text-danger';
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
