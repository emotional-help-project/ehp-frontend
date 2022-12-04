import { Component, OnInit } from '@angular/core';
import { TestListItem } from '../../models/test-list-item.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  
  tests: TestListItem[]; 

  constructor(private testsService: TestsService) {

  }

  ngOnInit(): void {
    this.tests = this.testsService.testList;
  }

  onClick() {
    console.log('');
    
  }

  addBackgraund(url: string) {
    return `linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${url})`
  }
}
