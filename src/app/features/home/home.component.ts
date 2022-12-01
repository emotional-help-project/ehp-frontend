import { Component } from '@angular/core';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
constructor(public coursesService: CoursesService, private dialog: MatDialog){}

openDialog() {
  this.dialog.open(DialogComponent, {
  minWidth: '400px',
  minHeight: '400px'
  });
}
}
