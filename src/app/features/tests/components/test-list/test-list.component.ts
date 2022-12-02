import { Component } from '@angular/core';
import { TestListItem } from '../../models/test-list-item.interface';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent {
  tests: TestListItem[] = [
    {
      name: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imgUrl: 'linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/assets/images/test-1.jpeg")'
    },
    {
      name: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imgUrl: 'linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/assets/images/test-2.jpeg")'
    },
    {
      name: 'Get to know yourself',
      description: 'With this personality test, you will find out what personality type you are',
      imgUrl: 'linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("/assets/images/test-3.jpeg")'
    },
  ];
  onClick() {
    console.log('');
    
  }
}
