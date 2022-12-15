import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import { Course } from '../../tests/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>

constructor(public coursesService: CoursesService){}
  ngOnInit(): void {
    this.courses$ = this.coursesService.getCourses().pipe(map(res => res));
  }
}
