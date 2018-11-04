import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile';
// import { UserService } from '../user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Profile;
  headlineEditor: FormGroup;
  constructor(
    // private userService: UserService,
  ) { }


  onSubmit() {
    this.headlineEditor.get('headline').markAsTouched();
    let formText = this.headlineEditor.get('headline').value;
    if(formText == "") {
      this.headlineEditor.get('headline').setErrors({
        required: true
      });
    } else if (this.headlineEditor.valid) {
      this.user.headline = formText;
      let userHeadline = JSON.parse(localStorage.getItem('userHeadline'));
      let findResult = false;
      if(userHeadline == null) {
        userHeadline = [{'user': this.user.displayName, 'headline': this.user.headline}];
      } else {
        let _this = this;
        userHeadline.forEach(function(item){
          if(item.userId == _this.user.userId) {
            item.headline = _this.user.headline;
            findResult = true;
          }
        }); 
        if(findResult == false){
          userHeadline.push({'user': _this.user.displayName, 'headline': _this.user.headline});
        }
      }
      localStorage.setItem('userHeadline', JSON.stringify(userHeadline));
      
      this.headlineEditor.get('headline').setValue('');
      this.headlineEditor.get('headline').markAsUntouched();
    }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let userHeadline = JSON.parse(localStorage.getItem('userHeadline'));
    if (userHeadline) {
      for (let i = 0; i < userHeadline.length; i++) {
        if (userHeadline[i].user == this.user.displayName) {
          this.user.headline = userHeadline[i].headline;
        }
      }
    }
    this.headlineEditor = new FormGroup({
      headline: new FormControl(null),
    });
  }

  get headline() { return this.headlineEditor.get('headline'); }

}
