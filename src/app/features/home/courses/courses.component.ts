import { Component } from '@angular/core';
import { CoursesService } from 'src/app/shared/courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
constructor(public coursesService: CoursesService){}
}
