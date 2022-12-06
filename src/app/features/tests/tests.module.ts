import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestSectionComponent } from './components/test-section/test-section.component';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './components/test-list/test-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestFormComponent } from './components/test-form/test-form.component';
import { AnswerBtnComponent } from './components/answer-btn/answer-btn.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TestResultComponent } from './components/test-result/test-result.component';
import { MultiTestComponent } from './components/multi-test/multi-test.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TestDialogComponent } from './components/test-dialog/test-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { AuthGuard } from '../login/services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../login/services/auth.guard';
import { ItemDialogComponent } from './components/item-dialog/item-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: TestSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '1',
    component: TestFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '2',
    component: MultiTestComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    TestSectionComponent,
    TestListComponent,
    TestFormComponent,
    AnswerBtnComponent,
    TestResultComponent,
    MultiTestComponent,
    TestDialogComponent,
    ItemDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TestsModule {}
