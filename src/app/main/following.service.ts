import { Injectable } from '@angular/core';
import { Following } from './following';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FollowingService {
  URL = 'http://localhost:3000';
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

  deleteFollowing(id: string): Observable<any> {
    return this.http.delete<any>(this.URL + '/following/' + id, this.httpOptions)
      .pipe(map(res => {
        // console.log(res);
        return res;
      }));
  }
}
