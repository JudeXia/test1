import { Injectable } from '@angular/core';
import { Following } from './following';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FollowingService {
  URL = 'https://ricebook-hw6.herokuapp.com';
  httpOptions = {
    withCredentials: true
  };
  constructor(
    private http: HttpClient
  ) { }

  // GET and PUT Following
  getFollowing(): Observable<any> {
    return this.http.get<any>(this.URL + '/following', this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  putFollowing(userId): Observable<any> {
    return this.http.put<any>(this.URL + '/following/' + userId, {}, this.httpOptions)
      .pipe(map(res => {
        // console.log('putFollowing');
        // console.log(res);
        return res.following;
      }));
  }

  deleteFollowing(id: string): Observable<any> {
    return this.http.delete<any>(this.URL + '/following/' + id, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }

  getUserId(username): Observable<any> {
    return this.http.get<any>(this.URL + '/profileid/' + username, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res.userid;
      }));
  }
}
