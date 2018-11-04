import {Comment} from './comment';

export class Post {

  constructor(
    public postId: number,
    public author: string,
    public time: Date,
    public text: string,
    public image: string,
    public comments: Comment[]
  ) {}

}
