import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // URL = 'https://ricebook-hw6.herokuapp.com';
  URL = 'http://localhost:3000';
  httpOptions = {
    withCredentials: true
  };
  constructor(
    private http: HttpClient
  ) { }

  // GET and PUT Email
  getEmail(): Observable<any> {
    return this.http.get<any>(this.URL + '/email', this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  putEmail(email): Observable<any> {
    return this.http.put<any>(this.URL + '/email', {email: email}, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  // GET and PUT Zipcode
  getZipcode(): Observable<any> {
    return this.http.get<any>(this.URL + '/zipcode', this.httpOptions)
      .pipe(map(res => {
        // console.log(res.zipcode);
        return res.zipcode;
      }));
  }

  putZipcode(zipcode): Observable<any> {
    return this.http.put<any>(this.URL + '/zipcode', {zipcode: zipcode}, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  // GET and PUT Phone
  getPhone(): Observable<any> {
    return this.http.get<any>(this.URL + '/phone', this.httpOptions)
      .pipe(map(res => {
        // console.log(res.phone);
        return res.phone;
      }));
  }

  putPhone(phone): Observable<any> {
    return this.http.put<any>(this.URL + '/phone', {phone: phone}, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  // GET DOB
  getDOB(): Observable<any> {
    return this.http.get<any>(this.URL + '/dob', this.httpOptions)
      .pipe(map(res => {
        // console.log(res.birthday);
        return res.birthday;
      }));
  }

  // GET and PUT Avatar
  getAvatar(ids = null): Observable<any> {
    let route = this.URL + '/avatars/';
    if (ids != null) {
      ids.forEach(id => {
        route += id + ',';
      });
      route = route.substring(0, route.length - 1);
    }
    return this.http.get<any>(route, this.httpOptions)
      .pipe(map(res => {
        // console.log(res.phone);
        return res.avatars;
      }));
  }

  // GET and PUT Headline
  getHeadlines(ids = null): Observable<any> {
    let route = this.URL + '/headlines/';
    if (ids != null) {
      ids.forEach(id => {
        route += id + ',';
      });
      route = route.substring(0, route.length - 1);
    }
    // console.log(route);
    return this.http.get<any>(route, this.httpOptions)
      .pipe(map(res => {
        // console.log(res.phone);
        return res.headlines;
      }));
  }

  putHeadline(headline): Observable<any> {
    return this.http.put<any>(this.URL + '/headline', headline, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }
}
