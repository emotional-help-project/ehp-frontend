import { Component } from '@angular/core';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.scss']
})
export class MessangerComponent {
  time = new Date();
  show = false;
}
