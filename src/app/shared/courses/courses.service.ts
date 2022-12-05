import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/features/home/dialog/dialog.component';
import { Course } from 'src/app/features/tests/models/course.model';
import { DialogData } from 'src/app/features/tests/models/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: Course[] = [
    {
      id: 1,
      url: '../../../assets/images/feelings.png',
      creatingDate:'12/11/21',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
    {
      id: 2,
      url: '../../../assets/images/feelings.png',
      creatingDate:'12/11/21',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
    {
      id: 3,
      url: '../../../assets/images/relationship.png',
      creatingDate:'12/11/21',
      title: 'Mental health training',
      description:
        'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. ',
    },
  ];
  constructor(private dialog: MatDialog){}
  delete(id: number){
    this.courses = this.courses.filter(item => item.id !== id)
  }
  addCourse(courses: Course){
    this.courses.push(courses)
  }

  coursesDialog(data: DialogData){
    this.dialog.open(DialogComponent, {
      data,
      minWidth: '400px',
      minHeight: '400px',
    })
  }
  updateCourse(course: Course){
    this.courses = this.courses.map(item => item.id === course.id ? course : item)

  }
}
