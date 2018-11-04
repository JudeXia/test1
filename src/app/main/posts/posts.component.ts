import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { Post } from '../post';
import { PostsService} from '../posts.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../profile';
import {Following} from '../following';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges {

  @Input() posts: Post[];

  postsShow: Post[];
  currentPostID: number;
  user: Profile;
  newPostForm: FormGroup;
  postSearchForm: FormGroup;
  keyword: string;
  constructor(

  ) { }


  onPostNewSubmit() {
    this.newPostForm.get('newPostText').markAsTouched();
    if (!this.newPostForm.invalid) {
      const newPost = this.newPostForm.get('newPostText').value;
      const time = new Date();
      this.posts.unshift(new Post(
        ++this.currentPostID,
        this.user.displayName,
        time,
        newPost,
        '',
        null
      ));
      this.newPostForm.get('newPostText').setValue('');
      this.newPostForm.get('newPostText').markAsUntouched();
    }
  }

  escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  onPostSearchSubmit(){
    this.postSearchForm.get('postSearchInput').markAsTouched();
    if (this.postSearchForm.valid) {
      this.postsShow = [];
      // this.keyword = this.postSearchForm.get('postSearchInput').value;
      for (const post of this.posts) {
        const regex = new RegExp(this.escapeRegex(this.keyword), 'gi');
        if(post.text.search(regex) !== -1 || post.author.search(regex) !== -1) {
          this.postsShow.push(post);
        }
      }
    }
  }

  onPostSearchReset() {
    this.postsShow = this.posts;
    this.keyword = '';
  }

  ngOnChanges() {
    if (this.posts !== undefined && this.posts.length > 0) {
      this.postsShow = this.posts;
      this.currentPostID = this.posts[0].postId;
    }
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.newPostForm = new FormGroup({
      newPostText: new FormControl(null, [
        Validators.required,
      ]),
    });
    this.postSearchForm = new FormGroup({
      postSearchInput: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  get newPostText() { return this.newPostForm.get('newPostText'); }
  get postSearchInput() { return this.postSearchForm.get('postSearchInput'); }

}
