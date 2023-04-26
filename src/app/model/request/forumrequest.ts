export class ForumRequest {
    question!: string;
    author!: string;

    constructor(question: string, author: string) {
        this.question = question;
        this.author = author;
    }
}