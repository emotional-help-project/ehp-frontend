import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/features/login/services/login.service';
import { TestDialogComponent } from '../test-dialog/test-dialog.component';

@Component({
  selector: 'app-test-section',
  templateUrl: './test-section.component.html',
  styleUrls: ['./test-section.component.scss']
})
export class TestSectionComponent {

  isAdmin = this.loginService.getParsedToken()?.isAdmin;

  constructor(private dialog: MatDialog, private loginService: LoginService){ }

  openDialog() {
    this.dialog.open(TestDialogComponent, {
      minWidth: '400px',
      minHeight: '400px'
    });
  }

}
