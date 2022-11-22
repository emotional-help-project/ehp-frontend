import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestSectionComponent } from './components/test-section/test-section.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: '',
   component: TestSectionComponent
 },
];

@NgModule({
  declarations: [
    TestSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TestsModule { }
