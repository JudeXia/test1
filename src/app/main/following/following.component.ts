import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FollowingService } from '../following.service';
import { Following } from '../following';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Profile } from '../../profile';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  user: Profile;
  @Input() followings: Following[];
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  addFollowingForm: FormGroup;
  alreadyExist = false;
  userNotFound = false;

  constructor(
    private followingService: FollowingService,
    private userService: UserService
  ) { }

  // onSubmit() {
  //   this.addFollowingForm.get('newFollowing').markAsTouched();
  //   if (!this.addFollowingForm.invalid) {
  //     const newFollowingName = this.addFollowingForm.get('newFollowing').value;
  //     this.alreadyExist = false;
  //     this.userNotFound = false;
  //     let flag = true; // temp flag for userNotFound
  //     if (newFollowingName === this.user.displayName) {
  //       alert('User name invalid! ');
  //       return;
  //     }
  //     for (const f of this.followings) {
  //       if (newFollowingName === f.displayName) {
  //         this.alreadyExist = true;
  //         alert('You have already followed this user!');
  //         return;
  //       }
  //     }
  //     const _this = this;
  //     this.userService.getUserProfile()
  //       .subscribe( {
  //         next (result: Profile[]) {
  //           result.forEach(function (re) {
  //             if (re['displayName'] === newFollowingName) {
  //               _this.followings.push(new Following(
  //                 re['displayName'],
  //                 re['avatar'],
  //                 re['displayName']
  //               ));
  //               flag = false;
  //               _this.addFollowingForm.get('newFollowing').setValue('');
  //               _this.addFollowingForm.get('newFollowing').markAsUntouched();
  //             }
  //           });
  //           _this.userNotFound = flag;
  //           if (flag) {
  //             alert('User not found!');
  //           }
  //         },
  //         complete() {
  //           _this.addEvent.emit();
  //         }
  //       });
  //   }
  // }

  removeFollowing(name: string) {
    for (let i = 0; i < this.followings.length; i++) {
      if (this.followings[i].displayName === name) {
        this.followings.splice(i, 1);
      }
    }
    this.deleteEvent.emit();
  }


  ngOnInit() {
    // console.log(this.followings)
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.addFollowingForm = new FormGroup({
      newFollowing: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  get newFollowing() { return this.addFollowingForm.get('newFollowing'); }

}
