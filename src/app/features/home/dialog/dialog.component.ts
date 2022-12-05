import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import { DialogData } from '../../tests/models/dialog-data';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
courseForm!: FormGroup;

constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private courses: CoursesService){}


ngOnInit(): void {
  this.courseForm = this.formBuilder.group({ 
    url: [this.data.course?.url, Validators.required],
    courseTitle: [this.data.course?.title, Validators.required],
    creatingDate: [this.data.course?.creatingDate && new Date(this.data.course?.creatingDate).toISOString(), Validators.required],
    description: [this.data.course?.description, Validators.required],
  })
}
addCourse(){
  const course = this.courseForm.value;
  if(this.data.course){
    this.courses.updateCourse({
      ...this.data.course,
      url: course.url,
      description: course.description,
      creatingDate: course.creatingDate,
      title: course.courseTitle,
    })
  }else{
    this.courses.addCourse({
      url: course.url,
      description: course.description,
      creatingDate: new Date().toISOString(),
      title: course.courseTitle,
      id: Date.now()
    })
  }

}
}
