import { Component } from '@angular/core';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {
  time: Date;
  show = false;

  onClick() {
    this.show = !this.show;
    this.time = new Date();
  }
}
