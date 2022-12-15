import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PassedTest } from '../../models/passedTest.interface';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-emotion-map-section',
  templateUrl: './emotion-map-section.component.html',
  styleUrls: ['./emotion-map-section.component.scss']
})
export class EmotionMapSectionComponent implements OnInit {
  tests$: Observable<PassedTest[]>;

  constructor(
    private statisticsService: StatisticsService,
    private loader: LoadingService
    ) {}

  ngOnInit(): void {
    this.tests$ = this.statisticsService.loadPassedTestList().pipe(map(res => res));
    this.loader.showLoaderUntilCompleted(this.tests$).subscribe()
  }

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
