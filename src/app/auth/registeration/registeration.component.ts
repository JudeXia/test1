import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { accountNameValidator, birthdayValidator, registerPasswordValidator } from '../../form-validator.directive';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private router: Router,
  ) { }

  onSubmit() {
    this.markFormTouched(this.registerForm);
    if (!this.registerForm.invalid) {
      alert('Successfully Registered!');
    }
    // // // timestamp
    // // document.getElementById('timestamp').value = d.getTime();
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
      'registerAccountName': new FormControl(null, [
        Validators.required,
        accountNameValidator(),
      ]),
      'registerDisplayName': new FormControl(null, [
        Validators.required
      ]),
      'registerEmail': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ]),
      'registerPhone': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      'registerZipcode': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{5}$'),
      ]),
      'registerBirthday': new FormControl(null, [
        Validators.required,
        birthdayValidator(),
      ]),

      'registerPasswordGroup': new FormGroup({
        'registerPassword1': new FormControl(null, [
          Validators.required,
        ]),
        'registerPassword2': new FormControl(null, [
          Validators.required,
        ])
      }, [
        registerPasswordValidator()
      ])
    });

  }

  get registerAccountName() { return this.registerForm.get('registerAccountName'); }
  get registerDisplayName() { return this.registerForm.get('registerDisplayName'); }
  get registerEmail() { return this.registerForm.get('registerEmail'); }
  get registerPhone() { return this.registerForm.get('registerPhone'); }
  get registerBirthday() { return this.registerForm.get('registerBirthday'); }
  get registerZipcode() { return this.registerForm.get('registerZipcode'); }
  get registerPasswordGroup() { return this.registerForm.get('registerPasswordGroup'); }
  get registerPassword1() { return this.registerForm.get('registerPasswordGroup').get('registerPassword1'); }
  get registerPassword2() { return this.registerForm.get('registerPasswordGroup').get('registerPassword2'); }

}
