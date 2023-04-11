import { Forum } from "./forum";
import { User } from "./user";

export class ForumComment {
    _id?: string;
    text!: string;
    parent!: Forum;
    author!: User;
}