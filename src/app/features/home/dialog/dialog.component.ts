import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import { DialogData } from '../../tests/models/dialog-data';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
courseForm!: FormGroup;

constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder, private courses: CoursesService,private ref: MatDialogRef<DialogComponent>,){}


ngOnInit(): void {
  this.courseForm = this.formBuilder.group({ 
    url: [this.data.course?.imageUrl, Validators.required],
    price: [this.data.course?.price, Validators.required],
    title: [this.data.course?.title, Validators.required],
    creatingDate: [this.data.course?.creatingDate && new Date(this.data.course?.creatingDate).toISOString(), Validators.required],
    description: [this.data.course?.description, Validators.required],
  })
}
addCourse(){
  const course = this.courseForm.value;
  if(this.data.course){
    this.courses.updateCourse({
      ...this.data.course,
      imageUrl: course.url,
      price: course.price,
      description: course.description,
      creatingDate: course.creatingDate,
      title: course.courseTitle,
    }).subscribe({
      next:(res)=>{
        console.log(res)
        this.ref.close();
      }
    })
  }else{
    this.courses.addCourse({
      imageUrl: course.url,
      price: course.price,
      description: course.description,
      creatingDate: new Date().toISOString(),
      title: course.courseTitle,
      id: Date.now()
    }).subscribe({
      next:()=>{
        this.ref.close();
      }
    })
  }

}
}
