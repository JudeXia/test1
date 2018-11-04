import { Injectable } from '@angular/core';
import { Following } from './following';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowingService{
  constructor(
    private http: HttpClient,
  ) { }

  getFollowings(): Observable<Object[]> {
    return this.http.get<Object[]>('../../assets/followings.json');
  }
}
