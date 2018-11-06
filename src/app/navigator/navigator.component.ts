import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  logout() {
    this.userService.logout()
      .subscribe(res => {
        console.log(res);
      });
    this.router.navigate(['landing']);
  }

  ngOnInit() {
  }


}
