import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FollowingService } from '../following.service';
import { Following } from '../following';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Profile } from '../../profile';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  @Input() followings: Following[];
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  addFollowingForm: FormGroup;

  constructor(
    private followingService: FollowingService,
    private userService: UserService,
    private router: Router
  ) { }

  removeFollowing(following) {
    // console.log(this.followings);
    // console.log(following);
    this.followingService.deleteFollowing(following.id)
    .subscribe(res => {
      // console.log(res);
      this.deleteEvent.emit();
    });
  }

  onSubmit() {
    const formControl = this.addFollowingForm.get('newFollowing');

    formControl.markAsTouched();
    const newFollowingUsername = formControl.value;
    if (newFollowingUsername === '') {
      formControl.setErrors({
        required: true
      });
    } else if (this.addFollowingForm.valid) {
      this.followingService.getUserId(newFollowingUsername)
      .subscribe(res => {
        // console.log(res);
        this.followingService.putFollowing(res)
        .subscribe(following => {
          // console.log(following);
          this.addEvent.emit();
        });
      },
      error => {
        console.log(error);
        this.router.navigate(['/landing']);
      });
      formControl.setValue('');
      formControl.markAsUntouched();
    }
  }

  ngOnInit() {
    this.addFollowingForm = new FormGroup({
      newFollowing: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  get newFollowing() { return this.addFollowingForm.get('newFollowing'); }

}
