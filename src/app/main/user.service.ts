import { Injectable } from '@angular/core';
import { Profile } from '../profile';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:3000';
  httpOptions = {
    withCredentials: true
  };
  constructor(
    private http: HttpClient,
  ) { }

  getUserProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>('../../assets/profile.json');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.URL + '/login', {username: username, password: password}, this.httpOptions)
      .pipe(map(res => {
        console.log(res);
        if(res) {
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    return this.http.put<any>(this.URL + '/logout', {}, this.httpOptions);
  }

}
