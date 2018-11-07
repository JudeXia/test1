import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'https://ricebook-hw6.herokuapp.com';
  httpOptions = {
    withCredentials: true
  };
  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.URL + '/login', {username: username, password: password}, this.httpOptions)
      .pipe(
        map(res => {
        if (res) {
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    return this.http.put<any>(this.URL + '/logout', {}, this.httpOptions);
  }

  register(userProfile: object): Observable<any> {
    return this.http.post<any>(this.URL + '/register', {userProfile: userProfile}, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        if (res.result === 'Successfully Registered') {
          return true;
        } else {
          return false;
        }
      }));
  }

  putPassword(password: string): Observable<any> {
    return this.http.put<any>(this.URL + '/password', {password: password}, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
          return res;
      }));
  }

}
