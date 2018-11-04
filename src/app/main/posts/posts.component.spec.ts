import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MainComponent} from '../main.component';
import {NavigatorComponent} from '../../navigator/navigator.component';
import {UserComponent} from '../user/user.component';
import {FollowingComponent} from '../following/following.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        NavigatorComponent,
        UserComponent,
        FollowingComponent,
        PostsComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the search keyword', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.keyword = 'when'
    component.onPostSearchSubmit();
    fixture.detectChanges();
    expect(compiled.querySelector('#searchKeyword').textContent).toContain('when');
  });
});
