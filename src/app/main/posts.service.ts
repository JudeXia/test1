import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // URL = 'https://ricebook-hw6.herokuapp.com';
  URL = 'http://localhost:3000';
  httpOptions = {
    withCredentials: true
  };
  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<any> {
    const route = this.URL + '/articles';
    return this.http.get<any>(route, this.httpOptions)
      .pipe(map(res => {
        // console.log(res.phone);
        return res.articles;
      }));
  }

  postPosts(article): Observable<any> {
    const route = this.URL + '/article';
    return this.http.post<any>(route, article, this.httpOptions)
      .pipe(map(res => {
        // console.log(res.phone);
        return res.articles;
      }));
  }

}
