import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent implements OnInit, OnDestroy {
user$: Observable<User>;
title: string;
type: string;
showModal = false;
toConfirm = false;
userId: number | undefined;

constructor(
  public profile: ProfileService,
) {
}
  ngOnInit(): void {
    this.profile.loadCurrentUser();
    this.user$ = this.profile.user$.pipe(map(user => user));
  }

  editData(title: any, type: string) {
    this.title = title;
    this.type = type;
    this.showModal = true;
  }

  changeData(data: any, id: number | undefined) {
    let newData = {};
    if (this.type === 'password') {
      newData = {newPassword: data.password};
      this.profile.updatePassword(newData, id).subscribe();
    } else {
      newData = data;
      this.profile.updateProfile(newData, id).subscribe();
    }
    
  }

  toDelete(id: number | undefined) {
    if (!id) {
      return
    }
    this.toConfirm = true;
    this.userId = id;
  }

  deleteAccount(confirmation: boolean) {
    if (!this.userId) {
      return
    }
    if (confirmation) {
      this.profile.deleteAccount(this.userId).subscribe();  
    }
    this.toConfirm = false;    
    this.userId = 0
  }

  ngOnDestroy() {
    console.log();
    
  }
}
