import { Component } from '@angular/core';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
constructor(public coursesService: CoursesService, private dialog: MatDialog, public loginService: LoginService ){}

openDialog() {
  this.dialog.open(DialogComponent, {
  minWidth: '400px',
  minHeight: '400px'
  });
}
onRemove(id: any){
  this.coursesService.delete(id)
}

}
