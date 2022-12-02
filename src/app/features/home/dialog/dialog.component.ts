import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { CoursesService } from 'src/app/shared/courses/courses.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
courseForm!: FormGroup;

constructor(private formBuilder: FormBuilder, private courses: CoursesService){}

ngOnInit(): void {
  this.courseForm = this.formBuilder.group({ 
    courseTitle: ['', Validators.required],
    creatingDate: ['', Validators.required],
    description: ['', Validators.required],
  })
}
addCourse(){
  const course = this.courseForm.value;
  this.courses.addCourse(course)
}
}
