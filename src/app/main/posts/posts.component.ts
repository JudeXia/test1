import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';
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

  @Input() posts: any[];
  @Output() addEvent = new EventEmitter<any>();
  postsShow: any[];
  newPostForm: FormGroup;
  postSearchForm: FormGroup;
  keyword: string;
  constructor(
    private postsService: PostsService
  ) { }


  onPostNewSubmit() {
    this.newPostForm.get('newPostText').markAsTouched();
    if (!this.newPostForm.invalid) {
      const newPost = {
        text: this.newPostForm.get('newPostText').value
      }
      this.newPostForm.get('newPostText').setValue('');
      this.newPostForm.get('newPostText').markAsUntouched();

      this.postsService.postPosts(newPost)
      .subscribe(res => {
        this.addEvent.emit();
        // console.log(res);
      });
    }
  }

  escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  onPostSearchSubmit() {
    this.postSearchForm.get('postSearchInput').markAsTouched();
    if (this.postSearchForm.valid) {
      this.postsShow = [];
      // this.keyword = this.postSearchForm.get('postSearchInput').value;
      for (const post of this.posts) {
        const regex = new RegExp(this.escapeRegex(this.keyword), 'gi');
        if (post.text.search(regex) !== -1 || post.author.displayName.search(regex) !== -1) {
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
    }
  }

  ngOnInit() {
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
