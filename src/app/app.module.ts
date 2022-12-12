import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { MessengerComponent } from './core/messenger/messenger.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './features/home/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { AppointmentDialogComponent } from './features/appointment/components/appointment-dialog/appointment-dialog.component';
import { LoginModule } from './features/login/login.module';
import { ContacstSectionComponent } from './features/contacts/components/contacst-section/contacst-section.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './features/contacts/components/google-map/google-map.component';
import { ProfileModule } from './features/profile/profile.module';
import { CoursesComponent } from './features/home/courses/courses.component';
import { SpecialistsModule } from './features/specialists/specialists.module';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    LoadingComponent, 
    MessengerComponent, 
    DialogComponent,
    AppointmentDialogComponent,
    ContacstSectionComponent,
    GoogleMapComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatButtonModule,
    ReactiveFormsModule,
    LoginModule,
    GoogleMapsModule,
    ProfileModule,
    SpecialistsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
