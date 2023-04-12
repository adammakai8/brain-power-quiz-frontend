import { ForumComment } from "./forumcomment";
import { User } from "./user";

export class Forum {
    _id?: string;
    text!: string;
    author!: User;
    comments?: ForumComment[];
}