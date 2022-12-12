import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TestListItem } from '../../models/test-list-item.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {
  tests$: Observable<TestListItem[]>;

  constructor(public testsService: TestsService) {}

  ngOnInit(): void {
    this.tests$ = this.testsService.tests$.pipe(map(res => res));
  }
/*   getAllTestsCard(){
    this.testsService.getTestCard()
    .subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }
  getTestType(){
    this.testsService.getTestType()
    .subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  } */

  addBackgraund(url: string) {
    let imgUrl;
    if (url) {
      imgUrl = url
    } else {
      imgUrl = '/assets/images/test-1.jpeg';
    }
    return `linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${imgUrl})`;
  }
}
