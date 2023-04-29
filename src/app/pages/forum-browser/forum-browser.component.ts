import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Forum } from 'src/app/model/forum';
import { ForumRequest } from 'src/app/model/request/forumrequest';
import { ForumService } from 'src/app/services/forum.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-forum-browser',
  templateUrl: './forum-browser.component.html',
  styleUrls: ['./forum-browser.component.scss']
})
export class ForumBrowserComponent implements OnInit {

  public isLoading?: Promise<boolean> | undefined;
  public forums?: Forum[];

  constructor(
    private tokenService: TokenService,
    private service: ForumService
    ) { }

  ngOnInit(): void {
    this.updateForums();
  }

  create(text: string) {
    const author =this.tokenService.getAuthor();
    this.service.create(new ForumRequest(text, author)).subscribe({
      next: () => {this.updateForums();},
      error: (e) => {console.error(e)}
    });
  }

  updateForums() {
    this.service.getAll().subscribe({
      next: (forums => {this.forums = forums;}),
      error: (e => console.error(e)),
      complete: () => {this.isLoading = Promise.resolve(true);}
    })
  }

}
