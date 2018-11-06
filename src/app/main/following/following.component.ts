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

  @Input() followings: Following[];
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  addFollowingForm: FormGroup;

  constructor(
    private followingService: FollowingService,
    private userService: UserService
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
