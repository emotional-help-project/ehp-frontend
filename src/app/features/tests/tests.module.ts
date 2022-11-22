import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestSectionComponent } from './components/test-section/test-section.component';
import { RouterModule, Routes } from '@angular/router';
import { TestListComponent } from './components/test-list/test-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
   path: '',
   component: TestSectionComponent
 },
];

@NgModule({
  declarations: [
    TestSectionComponent,
    TestListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TestsModule { }
