import { Component, OnInit } from '@angular/core';
import { Following } from './following';
import { Post } from './post';
import { FollowingService} from './following.service';
import { PostsService } from './posts.service';
import { Profile } from '../profile';
import { Comment } from './comment';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private followingService: FollowingService,
    private postsService: PostsService
  ) { }
  mainUser: Profile;
  mainFollowings: Following[] = [];
  followings: Following[];
  mainPosts: Post[] = [];
  posts: Post[];

  getFollowings() {
    this.followingService.getFollowings()
      .subscribe( (re: Object[]) => {
        for (const r of re) {
          if (r['userId'] === this.mainUser.userId) {
            // console.log(r['followings']);
            this.mainFollowings = r['followings'];
            const userHeadline = JSON.parse(localStorage.getItem('userHeadline'));
            if (userHeadline) {
              for (let f of this.mainFollowings) {
                for (const u of userHeadline) {
                  if (f.displayName === u.user) {
                    f.headline = u.headline;
                  }
                }
              }
            }
            this.followings = this.mainFollowings;
          }
        }
      });
  }

  getPosts() {
    const _this = this;   // this would be changed to observerble inside the handler
    this.postsService.getPosts()
      .subscribe( (re: Post[]) => {
        for (const r of re) {
          let comments: Comment[] = [];
          for(const c of r['comments']) {
            comments.push(new Comment(c['author'], c['text']));
          }
          const time = new Date(r['timestamp']);
          _this.mainPosts.push(new Post(r['postId'], r['author'], time, r['text'], r['image'], comments));
        }
        // let deleteCount = 0;
        _this.pickPosts();
        _this.mainPosts.sort((a, b) => b.time.getTime() - a.time.getTime());
        // console.log(this.mainPosts);
        _this.posts = _this.mainPosts;
      });
  }

  pickPosts() {
    if (this.mainPosts && this.followings) {
      for (let i = 0; i < this.mainPosts.length; i++) {

        const author = this.mainPosts[i].author;
        let flag = false;
        for (const following of this.followings) {
          if (author === following.displayName) {
            flag = true;
          }
        }
        if (author === this.mainUser.displayName) {
          flag = true;
        }
        if (flag === false) {
          this.mainPosts.splice(i,1);
          i--;
        }
      }
    }
  }

  deleteFollowing() {
    this.pickPosts();
    this.posts = this.mainPosts;
  }

  addFollowing() {
    this.mainPosts = [];
    this.getPosts();
  }

  ngOnInit() {
    this.mainUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getFollowings();
    this.getPosts();
  }

}
