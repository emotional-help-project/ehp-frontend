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
// import { AuthGuard } from '../login/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TestSectionComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '1',
    component: TestFormComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    TestSectionComponent,
    TestListComponent,
    TestFormComponent,
    AnswerBtnComponent,
    TestResultComponent,
    MultiTestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatProgressBarModule,
  ],
})
export class TestsModule {}
