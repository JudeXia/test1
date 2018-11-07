import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { accountNameValidator, birthdayValidator, registerPasswordValidator } from '../../form-validator.directive';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  registerForm: FormGroup;
  showMessage: boolean;
  messageText: String;
  messageClass: String;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  onSubmit() {
    this.markFormTouched(this.registerForm);
    if (this.registerForm.valid) {
        const birthday = this.registerForm.get('birthday').value.split('-');
        const d = new Date(birthday[0], birthday[1] - 1, birthday[2]);
        const userProfile = {
        username: this.registerForm.get('registerUsername').value,
        displayName: this.registerForm.get('displayName').value,
        email: this.registerForm.get('email').value,
        phone: this.registerForm.get('phone').value,
        birthday: d.getTime().toString(),
        zipcode: this.registerForm.get('zipcode').value,
        password: this.registerForm.get('passwordGroup').get('registerPassword').value,
        confirm: this.registerForm.get('passwordGroup').get('confirm').value
      };
      return this.userService.register(userProfile)
        .subscribe(
          (isRegistered) => {
            if (isRegistered) {
              this.messageText = 'Successfully Registered! ';
              this.showMessage = true;
              this.messageClass = 'text-success';
            }
          },
          error => {
            if (error.status === 403) {
              // console.log(error);
              this.messageText = error.error.result;
              this.showMessage = true;
              this.messageClass = 'text-danger';
            }
          }
        );
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
    this.registerForm = new FormGroup({
      'registerUsername': new FormControl(null, [
        Validators.required,
        accountNameValidator(),
      ]),
      'displayName': new FormControl(null, [
        Validators.required
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ]),
      'phone': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      'zipcode': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      'birthday': new FormControl(null, [
        Validators.required,
        birthdayValidator(),
      ]),

      'passwordGroup': new FormGroup({
        'registerPassword': new FormControl(null, [
          Validators.required,
        ]),
        'confirm': new FormControl(null, [
          Validators.required,
        ])
      }, [
        registerPasswordValidator()
      ])
    });

  }

  get registerUsername() { return this.registerForm.get('registerUsername'); }
  get displayName() { return this.registerForm.get('displayName'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get birthday() { return this.registerForm.get('birthday'); }
  get zipcode() { return this.registerForm.get('zipcode'); }
  get passwordGroup() { return this.registerForm.get('passwordGroup'); }
  get registerPassword() { return this.registerForm.get('passwordGroup').get('registerPassword'); }
  get confirm() { return this.registerForm.get('passwordGroup').get('confirm'); }

}
