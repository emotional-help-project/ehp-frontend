import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent implements OnInit {
user$: Observable<User>;

constructor(
  private profile: ProfileService
) {
}
  ngOnInit(): void {
    this.user$ = this.profile.user$.pipe(map(user => user));
  }
}
