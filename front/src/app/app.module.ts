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
import { HomePageComponent } from './components/home-page/home-page.component';
import { CottagesPageComponent } from './components/cottages-page/cottages-page.component';
import { ShipsPageComponent } from './components/ships-page/ships-page.component';
import { InstructorsPageComponent } from './components/instructors-page/instructors-page.component';
import { CottageProfileUnauthenticatedUserComponent } from './components/cottage-profile-unauthenticated-user/cottage-profile-unauthenticated-user.component';
import { ShipProfileUnauthenticatedUserComponent } from './components/ship-profile-unauthenticated-user/ship-profile-unauthenticated-user.component';
import { HomePageNavbarComponent } from './components/home-page-navbar/home-page-navbar.component';
import { InstructorProfileUnauthenticatedUserComponent } from './components/instructor-profile-unauthenticated-user/instructor-profile-unauthenticated-user.component';
import { RegisterFormClientComponent } from './components/register-form-client/register-form-client.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientProfileForOwnerComponent } from './components/client-profile-for-owner/client-profile-for-owner.component';

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
    HomePageComponent,
    CottagesPageComponent,
    ShipsPageComponent,
    InstructorsPageComponent,
    CottageProfileUnauthenticatedUserComponent,
    ShipProfileUnauthenticatedUserComponent,
    HomePageNavbarComponent,
    InstructorProfileUnauthenticatedUserComponent,
    RegisterFormClientComponent,
    ClientProfileComponent,
    ClientProfileForOwnerComponent
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
