import { Component, OnInit } from '@angular/core';
import { testResult } from '../../models/test-result.interface';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  
  testResult: testResult;
  constructor(private testService: TestsService) {

  }

  ngOnInit(): void {
    this.testResult = this.testService.testResult;
  }
}
