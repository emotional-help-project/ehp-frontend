import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsychologistsComponent } from './components/psychologists/psychologists.component';



@NgModule({
  declarations: [
    PsychologistsComponent
  ],
  imports: [
    CommonModule,
  ], 
  exports: [
    PsychologistsComponent
  ]
})
export class SpecialistsModule { }
