import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {Router} from '@angular/router';
import { UserService } from '../main/user.service';

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
    localStorage.clear();
    this.router.navigate(['landing']);
  }

  ngOnInit() {
  }


}
