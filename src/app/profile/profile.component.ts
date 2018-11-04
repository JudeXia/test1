import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { UserService } from '../main/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { accountNameValidator, updatePasswordValidator } from '../form-validator.directive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Profile;
  updateForm: FormGroup;
  formGroupArray = [
    {
      userFieldName: 'accountName',
      formControlName: 'updateAccountName',
    },
    {
      userFieldName: 'displayName',
      formControlName: 'updateDisplayName',
    },
    {
      userFieldName: 'email',
      formControlName: 'updateEmail',
    }, 
    {
      userFieldName: 'phoneNumber',
      formControlName: 'updatePhone',
    }, 
    {
      userFieldName: 'zipcode',
      formControlName: 'updateZipcode',
    }
  ]
  constructor(
    private userService: UserService,
  ) { }

  onSubmit() {
    this.markFormTouched(this.updateForm);
    if (!this.updateForm.invalid) {
      let _this = this;

      // update common field
      this.formGroupArray.forEach(function(name){
        if (_this.updateForm.get(name.formControlName).value !== null && _this.updateForm.get(name.formControlName).value !== '') {
          _this.user[name.userFieldName] = _this.updateForm.get(name.formControlName).value;
          _this.updateForm.get(name.formControlName).setValue( null);
        }
      })

      // update password
      if (_this.updateForm.get('updatePasswordGroup').get('updatePassword1').value !== null) {
        _this.user.password = _this.updateForm.get('updatePasswordGroup').get('updatePassword1').value;
        _this.updateForm.get('updatePasswordGroup').get('updatePassword1').setValue( null);
        _this.updateForm.get('updatePasswordGroup').get('updatePassword2').setValue( null);
      }
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
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.updateForm = new FormGroup({
      'updateAccountName': new FormControl(null, [
        accountNameValidator(),
      ]),
      'updateDisplayName': new FormControl(null),
      'updateEmail': new FormControl(null, [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
      ]),
      'updatePhone': new FormControl(null, [
        Validators.pattern('^[0-9]{10}$'),
      ]),
      'updateZipcode': new FormControl(null, [
        Validators.pattern('^[0-9]{5}$'),
      ]),

      // seems like both values and disabled are required in this case
      'updateBirthday': new FormControl({value: null, disabled: true}),

      'updatePasswordGroup': new FormGroup({
        'updatePassword1': new FormControl(null, [
        ]),
        'updatePassword2': new FormControl(null, [
        ])
      }, [
        updatePasswordValidator()
      ])
    });

  }

  get updateAccountName() { return this.updateForm.get('updateAccountName'); }
  get updateDisplayName() { return this.updateForm.get('updateDisplayName'); }
  get updateEmail() { return this.updateForm.get('updateEmail'); }
  get updatePhone() { return this.updateForm.get('updatePhone'); }
  get updateBirthday() { return this.updateForm.get('updateBirthday'); }
  get updateZipcode() { return this.updateForm.get('updateZipcode'); }
  get updatePasswordGroup() { return this.updateForm.get('updatePasswordGroup'); }
  get updatePassword1() { return this.updateForm.get('updatePasswordGroup').get('updatePassword1'); }
  get updatePassword2() { return this.updateForm.get('updatePasswordGroup').get('updatePassword2'); }



}
