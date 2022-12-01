import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  success$: Observable<string[]>;
  errors$: Observable<string[]>;

  constructor(public messages: MessagesService) { }

  ngOnInit(): void {
    this.success$ = this.messages.success$
    .pipe(tap(() => {
      this.showMessages = true;
      this.hideMessage();
    }))

    this.errors$ = this.messages.errors$
    .pipe(tap(() => {
      this.showMessages = true;
      this.hideMessage();
    }))
    
    this.hideMessage();
  }

  hideMessage() {
    setTimeout(() => {
      this.showMessages = false;
    }, 5000);
  }
}
