import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Forum } from 'src/app/model/forum';
import { ForumCommentRequest } from 'src/app/model/request/forumcommentrequest';
import { ForumService } from 'src/app/services/forum.service';
import { ForumCommentService } from 'src/app/services/forumcomment.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {


  public isLoading?: Promise<boolean> | undefined;
  public forum!: Forum;
  public isForumCreater?: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private forumCommentService: ForumCommentService,
    public tokenService: TokenService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
  
    this.updateForumComments(id);
  }

  create(text: string) {
    const author =this.tokenService.getAuthor();
    console.log(new ForumCommentRequest(text, this.forum, author));
    this.forumCommentService.create(new ForumCommentRequest(text, this.forum, author)).subscribe({
      next: () => {this.updateForumComments(this.forum._id!);},
      error: (e) => {console.error(e)}
    });
  }

  deleteForum() {
    this.forumService.delete(this.forum._id).subscribe({
      next: () => {this.router.navigate(['/forum'])},
      error: (e) => {console.error(e)}
    })
  }

  updateForumComments(id: string) {
    this.forumService.getForumByID(id).subscribe({
      next: (forum) => {this.forum = forum; console.log(this.forum)},
      error: (e) => {console.error(e);},
      complete: () => {this.isLoading = Promise.resolve(true);}
    });
  }

}
