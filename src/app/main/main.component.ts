import { Component, OnInit } from '@angular/core';
import { Following } from './following';
import { Post } from './post';
import { FollowingService} from './following.service';
import { PostsService } from './posts.service';
import { ProfileService } from '../profile.service';
import { UserService } from '../user.service';
import { Profile } from '../profile';
import { Comment } from './comment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private followingService: FollowingService,
    private postsService: PostsService,
    private profileService: ProfileService,
    private userService: UserService, 
    private router: Router
  ) { }
  mainUser: Profile;
  mainFollowings: Following[] = [];
  followings: Following[];
  mainPosts: any[] = [];
  posts: any[] = [];

  getFollowings() {
    this.followingService.getFollowing()
      .subscribe( (res) => {
        // console.log(res);
        const followingIds = res.following;
        if(followingIds.length > 0) {
          this.profileService.getHeadlines(followingIds)
          .subscribe((headlines) => {
            // console.log(headlines);
            this.profileService.getAvatar(followingIds)
            .subscribe(avatars => {
              // console.log(avatars);
              let newFollowing = new Following();
              for (let i = 0; i < headlines.length; i++) {
                if (headlines[i].userid === avatars[i].userid) {
                  newFollowing = new Following(
                    avatars[i].displayName,
                    avatars[i].avatar,
                    headlines[i].headline,
                    headlines[i].userid
                  );
                }
                this.mainFollowings.push(newFollowing);
              }
              // console.log(this.mainFollowings);
              this.followings = this.mainFollowings;
            });
          });
        } else {
          this.followings = [];
        }
      },
      error => {
        // console.log(error);
        this.router.navigate(['/landing']);
      });
  }

  getPosts() {
    this.followingService.getFollowing()
      .subscribe( (res) => {
        // console.log(res);
        this.postsService.getPosts()
        .subscribe(
          (posts) => {
            // console.log(posts);
            posts.sort((post1, post2) => {
              const d1 = new Date(post1.createdAt)
              const d2 = new Date(post2.createdAt)
              return d2.getTime() - d1.getTime();
            });
            posts.forEach((post) => {
              const d = new Date(post.createdAt);
              const array = d.toString().split(' ');
              post['date'] = array[1] + ' ' + array[2] + ' ' + array[3] + ' ' + array[4];
            });
            this.mainPosts = posts;
            this.posts = posts;
          });
      },
      error => {
        // console.log(error);
        this.router.navigate(['/landing']);
      });
  }

  deleteFollowing() {
    this.mainFollowings = [];
    this.getFollowings();
    this.getPosts();
  }

  addFollowing() {
    this.mainFollowings = [];
    this.getFollowings();
    this.getPosts();
  }

  addPost() {
    this.getPosts();
  }

  ngOnInit() {
    this.getFollowings();
    this.getPosts();
  }

}
