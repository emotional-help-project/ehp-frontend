import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap} from 'rxjs/operators';
import { DialogComponent } from 'src/app/features/home/dialog/dialog.component';
import { Course } from 'src/app/features/tests/models/course.model';
import { DialogData } from 'src/app/features/tests/models/dialog-data';
import { environment } from 'src/environment/environment';



@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: Course[] = [];
  constructor(private dialog: MatDialog, private http: HttpClient){}

  getCourses(){
    const url = environment.apiUrl + '/courses';
    return  this.http.get<Course[]>(url)
    .pipe( tap(courses => this.courses = courses))
  }


  delete(id: number){
    //this.courses = this.courses.filter(item => item.id !== id)
    const url = environment.apiUrl + `/courses/${id}`;
    return this.http.delete(url);
  }
  addCourse(courses: Course){
    /* this.courses.push(courses) */
    const url = environment.apiUrl + '/courses';
    return this.http.post<Course>(url, courses);
  }

  coursesDialog(data: DialogData){
    this.dialog.open(DialogComponent, {
      data,
      minWidth: '400px',
      minHeight: '400px',
    })
  }
  updateCourse(courses: Course){
    //this.courses = this.courses.map(item => item.id === course.id ? course : item) 
    const url = environment.apiUrl + '/courses';
    return this.http.put<Course>(url, courses);
  }
}
