import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import { LoginService } from '../../login/services/login.service';
import { Course } from '../../tests/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  isAdmin = this.loginService.getParsedToken()?.isAdmin;
  courses$: Observable<Course[]>

constructor(public coursesService: CoursesService, private dialog: MatDialog, public loginService: LoginService){}
  ngOnInit(): void {
    this.getAllCourses()
    this.courses$ = this.coursesService.getCourses().pipe(map(res => res));
  }

  openAddDialog() {
    this.coursesService.coursesDialog({
      title: 'Add new training',
      btn: 'Save'
    });
  }
  getAllCourses(){
    this.coursesService.getCourses()
    .subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }
  openUpdateDialog(course: any){
    this.coursesService.coursesDialog({
      title: 'Update training',
      btn: 'Update',
      course
    });
  
  }
  onRemove(id: any){
    this.coursesService.delete(id)
    .subscribe()
  }
}
