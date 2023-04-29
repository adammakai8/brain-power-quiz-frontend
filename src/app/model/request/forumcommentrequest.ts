import { Forum } from "../forum";

export class ForumCommentRequest {
    text!: string;
    parent!: Forum;
    author!: string;

    constructor(text: string, parent: Forum, author: string) {
        this.text = text;
        this.parent = parent;
        this.author = author;
    }
}