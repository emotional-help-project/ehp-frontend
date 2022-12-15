import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin = this.loginService.getParsedToken()?.isAdmin;
constructor(public coursesService: CoursesService, private dialog: MatDialog, public loginService: LoginService ){}
ngOnInit(): void {
  this.getAllCourses()
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
