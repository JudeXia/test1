import { Component, OnInit } from '@angular/core';
import { Profile } from '../../profile';
import { ProfileService } from '../../profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profile: Profile;
  headlineEditor: FormGroup;
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) { }

  getProfile() {
    this.profileService.getAvatar()
    .subscribe(avatars => {
      // console.log(avatars)
      this.profile.avatar = avatars[0].avatar;
    },
    error => {
      // console.log(error);
      this.router.navigate(['/landing']);
    });
    this.profileService.getHeadlines()
    .subscribe(headlines => {
      // console.log(headlines)
      this.profile.headline = headlines[0].headline;
      this.profile.displayName = headlines[0].displayName;
    },
    error => {
      // console.log(error);
      this.router.navigate(['/landing']);
    });

  }

  onSubmit() {
    this.headlineEditor.get('headline').markAsTouched();
    const newHeadline = this.headlineEditor.get('headline').value;
    if (newHeadline === '') {
      this.headlineEditor.get('headline').setErrors({
        required: true
      });
    } else if (this.headlineEditor.valid) {
      this.profileService.putHeadline({
        headline: newHeadline
      })
      .subscribe(res => {
        this.getProfile();
        // console.log(res);
      },
      error => {
        // console.log(error);
        this.router.navigate(['/landing']);
      })
      this.headlineEditor.get('headline').setValue('');
      this.headlineEditor.get('headline').markAsUntouched();
    }
  }

  ngOnInit() {
    this.profile = new Profile();
    this.getProfile();
    this.headlineEditor = new FormGroup({
      headline: new FormControl(null),
    });
  }

  get headline() { return this.headlineEditor.get('headline'); }

}
