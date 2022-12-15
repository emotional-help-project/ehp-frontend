import { Component, Input } from '@angular/core';
import { TestResult } from '../../models/test-result.interface';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent{
  @Input() testResult: TestResult;
}
