import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function accountNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const reg = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{2,9}$/);
    const result = reg.test(control.value);
    return result ? null : {'invalidAccountName': {value: control.value}};
  };
}

export function birthdayValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    ////////// common date validation //////////
    if (control.value !== null) {
      // console.log(control.value)
      const dateArr: string [] = control.value.split('-');
      if (dateArr.length === 3 && dateArr[0].length === 4 &&  dateArr[1].length === 2 &&  dateArr[2].length === 2 ) {
        const monthInput = parseInt(dateArr[1], 10);
        const dayInput = parseInt(dateArr[2], 10);
        const yearInput = parseInt(dateArr[0], 10);
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0) {
          daysInMonth[1] = 29;
        }
        // console.log(dayInput);
        if (yearInput < 1900 || monthInput > 12 || monthInput < 1 || dayInput < 1 || dayInput > daysInMonth[monthInput - 1]) {
          return {'invalidBirthday': 'Invalid Date of Birth! '};
        }

        ////////// Age 18 validation //////////

        const d = new Date();
        const monthNow = d.getMonth() + 1;		// 0-11
        const dayNow = d.getDate();				// 1-31
        const yearNow = d.getFullYear();	//

        let age = yearNow - yearInput;
        // flagMD: Test if month&day input > month&day now, ignoring year
        const flagMD = (monthInput > monthNow) || ((monthInput === monthNow) && (dayInput > dayNow));

        if (age < 0 || (age === 0 && flagMD)) {
          return {'invalidBirthday': 'Invalid Date of Birth! '};
        }
        if (flagMD) {
          age--;
        }

        if (age < 18) {
          return {'invalidBirthday': 'Only individuals 18 years of age or older are allowed to register! '};
        }

        return null;
      } else {
        return {'invalidBirthday': 'Invalid Date of Birth! '};
      }
    }

  };
}

export function registerPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password2 = control.get('confirm').value;
    const password1 = control.get('registerPassword').value;

    if ( password2 !== password1 ) {
      return {'registerPassword': 'Two passwords do not match! ' };
    } else {
      return null;
    }
  };
}

export function updatePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.get('updatePassword2').dirty && control.get('updatePassword2').touched ||
      control.get('updatePassword1').dirty && control.get('updatePassword1').touched) {
      const password2 = control.get('updatePassword2').value;
      const password1 = control.get('updatePassword1').value;
      if (password1 === '' && password2 !== '' || password1 !== '' && password2 === '') {
        return {'updatePasswordRequired': 'Two passwords are both required!' };
      } else {
        if ( password2 !== password1 ) {
          return {'updatePassword': 'Two passwords do not match! ' };
        } else {
          return null;
        }
      }
    }
  };
}


