import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './components/registerForm/registerForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CottageProfileComponent } from './components/cottage-profile/cottage-profile.component';
import { CottageOwnerProfileComponent } from './components/cottage-owner-profile/cottage-owner-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user-service.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HotOfferComponent } from './components/hot-offer/hot-offer.component';
import { CottageCalendarComponent } from './components/cottage-calendar/cottage-calendar.component';
import { AddNewCottageComponent } from './components/add-new-cottage/add-new-cottage.component';
import { OwnerNavbarComponent } from './components/owner-navbar/owner-navbar.component';
import { OwnerReservationsComponent } from './components/owner-reservations/owner-reservations.component';
import { CottageReservationsComponent } from './components/cottage-reservations/cottage-reservations.component';
import { AdministratorProfileComponent } from './components/administrator-profile/administrator-profile/administrator-profile.component';
import { ChangeAdministratorsPasswordComponent } from './components/change-administrators-password/change-administrators-password/change-administrators-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    CottageProfileComponent,
    CottageOwnerProfileComponent,
    LoginFormComponent,
    HotOfferComponent,
    CottageCalendarComponent,
    AddNewCottageComponent,
    OwnerNavbarComponent,
    OwnerReservationsComponent,
    CottageReservationsComponent,
    AdministratorProfileComponent,
    ChangeAdministratorsPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
