import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { accountNameValidator, updatePasswordValidator } from '../form-validator.directive';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  updateForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
  ) { }

  pad(n, len) {
    const l = Math.floor(len);
    const sn = '' + n;
    const snl = sn.length;
    if (snl >= l) {
      return sn;
    }
    return '0'.repeat(l - snl) + sn;
}

  getProfile() {
    this.profileService.getEmail()
      .subscribe((res) => {
        this.profile.email = res.email;
        this.profile.username = res.username;
        this.profile.displayName = res.displayName;
      });
    this.profileService.getZipcode()
      .subscribe((res) => {
        this.profile.zipcode = res;
      });
    this.profileService.getDOB()
      .subscribe((res) => {
        const d = new Date(parseInt(res, 10));
        const birthday = this.pad(d.getFullYear(), 4) + '-' + this.pad((d.getMonth() + 1), 2) + '-' + this.pad(d.getDate(), 2);
        this.profile.birthday = birthday;
      });
    this.profileService.getPhone()
      .subscribe((res) => {
        this.profile.phone = res;
      });
    this.profileService.getAvatar()
    .subscribe((res) => {
      this.profile.avatar = res[0].avatar;
    });
  }

  onSubmit() {
    this.markFormTouched(this.updateForm);
    if (!this.updateForm.invalid) {

      // update field
      let formControl = this.updateForm.get('updateEmail');
      if (formControl.value !== null && formControl.value !== '') {
        // console.log('updateEmail');
        this.profileService.putEmail(formControl.value)
        .subscribe((res) => {
          this.profile['email'] = res.email;
        });
        formControl.setValue(null);
      }

      formControl = this.updateForm.get('updateZipcode');
      if (formControl.value !== null && formControl.value !== '') {
        // console.log('updateZipcode');
        this.profileService.putZipcode(formControl.value)
        .subscribe((res) => {
          this.profile['zipcode'] = res.zipcode;
        });
        formControl.setValue(null);
      }

      formControl = this.updateForm.get('updatePhone');
      if (formControl.value !== null && formControl.value !== '') {
        // console.log('updatePhone');
        this.profileService.putPhone(formControl.value)
        .subscribe((res) => {
          this.profile['phone'] = res.phone;
        });
        formControl.setValue(null);
      }
    }

    const formControl1 = this.updateForm.get('updatePasswordGroup').get('updatePassword1');
    const formControl2 = this.updateForm.get('updatePasswordGroup').get('updatePassword2');
    const formGroup = this.updateForm.get('updatePasswordGroup');
    if (formControl1.value !== null && formControl1.value !== '' && formGroup.valid) {
      this.userService.putPassword(formControl1.value)
        .subscribe((res) => {
          return res;
        });
      formControl1.setValue( null);
      formControl2.setValue( null);
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
    this.profile = new Profile();
    this.getProfile();
    this.updateForm = new FormGroup({
      'updateUsername': new FormControl(null, [
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

  get updateUsername() { return this.updateForm.get('updateUsername'); }
  get updateDisplayName() { return this.updateForm.get('updateDisplayName'); }
  get updateEmail() { return this.updateForm.get('updateEmail'); }
  get updatePhone() { return this.updateForm.get('updatePhone'); }
  get updateBirthday() { return this.updateForm.get('updateBirthday'); }
  get updateZipcode() { return this.updateForm.get('updateZipcode'); }
  get updatePasswordGroup() { return this.updateForm.get('updatePasswordGroup'); }
  get updatePassword1() { return this.updateForm.get('updatePasswordGroup').get('updatePassword1'); }
  get updatePassword2() { return this.updateForm.get('updatePasswordGroup').get('updatePassword2'); }



}
