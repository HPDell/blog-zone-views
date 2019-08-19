import { Post } from "./Post";
import { Saying } from "./Saying";
import { UserInfo } from "./UserInfo";

export class Comment {
    id: string;
    commentDate: Date;
    content: string;
    user: UserInfo;
    isRoot: boolean;
    root: Comment;
    children: Comment[];
    replyTo: Comment;
    post: Post[];

}