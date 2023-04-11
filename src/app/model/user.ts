import { Forum } from "./forum";
import { ForumComment } from "./forumcomment";

export class User {
    _id?: string;
    name!: string;
    email!: string;
    birthYear!: number;
    password!: string;
    forums?: Forum[];
    forumcomments?: ForumComment[];
}