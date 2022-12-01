import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
courseForm!: FormGroup;

constructor(private formBuilder: FormBuilder){}

ngOnInit(): void {
  this.courseForm = this.formBuilder.group({ 
    courseTitle: ['', Validators.required],
    creatingDate: ['', Validators.required],
    description: ['', Validators.required],
  })
}
addCourse(){
  console.log(this.courseForm.value)
}
}
