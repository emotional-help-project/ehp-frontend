import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Specialist } from '../../models/specialist';
import { SpecialistsService } from '../../services/specialists.service';

@Component({
  selector: 'app-psychologists',
  templateUrl: './psychologists.component.html',
  styleUrls: ['./psychologists.component.scss']
})
export class PsychologistsComponent implements OnInit {

  psychologists$: Observable<Specialist[] | null>;

  constructor(private psychologistsService: SpecialistsService) {}

  ngOnInit(): void {
    this.psychologists$ = this.psychologistsService.specialists$.pipe(res => res);
  }
}
