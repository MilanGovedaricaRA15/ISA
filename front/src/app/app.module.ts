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
import { SuperiorAdministratorProfileComponent } from './components/superior-administrators-profile/superior-administrator-profile/superior-administrator-profile.component';
import { AddNewAdministratorComponent } from './components/add-new-administrator/add-new-administrator/add-new-administrator.component';
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
import { ClientNavbarComponent } from './components/client-navbar/client-navbar.component';
import { CottagesPageClientComponent } from './components/cottages-page-client/cottages-page-client.component';
import { ShipsPageClientComponent } from './components/ships-page-client/ships-page-client.component';
import { InstructorsPageClientComponent } from './components/instructors-page-client/instructors-page-client.component';
import { CottageProfileClientComponent } from './components/cottage-profile-client/cottage-profile-client.component';
import { ShipProfileClientComponent } from './components/ship-profile-client/ship-profile-client.component';
import { InstructorProfileClientComponent } from './components/instructor-profile-client/instructor-profile-client.component';
import { CottagesReservationsPageClientComponent } from './components/cottages-reservations-page-client/cottages-reservations-page-client.component';
import { ShipsReservationsPageClientComponent } from './components/ships-reservations-page-client/ships-reservations-page-client.component';
import { InstructorsReservationsPageClientComponent } from './components/instructors-reservations-page-client/instructors-reservations-page-client.component';
import { ShipProfileComponent } from './components/ship-profile/ship-profile.component';
import { ShipOwnerProfileComponent } from './components/ship-owner-profile/ship-owner-profile.component';
import { ShipHotOfferComponent } from './components/ship-hot-offer/ship-hot-offer.component';
import { ShipReservationsComponent } from './components/ship-reservations/ship-reservations.component';
import { ShipOwnerReservationsComponent } from './components/ship-owner-reservations/ship-owner-reservations.component';
import { ShipCalendarComponent } from './components/ship-calendar/ship-calendar.component';
import { ShipOwnerReportComponent } from './components/ship-owner-report/ship-owner-report.component';
import { CottageOwnerReportComponent } from './components/cottage-owner-report/cottage-owner-report.component';
import { AddNewShipComponent } from './components/add-new-ship/add-new-ship.component';
import { AddReportComponent } from './components/add-report/add-report.component';
import { AddShipReservationReportComponent } from './components/add-ship-reservation-report/add-ship-reservation-report.component';
import { MapComponent } from './components/map/map.component';
import { InstructorProfileComponent } from './components/instructor-profile/instructor-profile.component';
import { FavorProfileComponent } from './components/favor-profile/favor-profile.component';
import { AddNewFavorComponent } from './components/add-new-favor/add-new-favor.component';
import { AddFavorReservationReportComponent } from './components/add-favor-reservation-report/add-favor-reservation-report.component';
import { CreateAReservationClientComponent } from './components/create-a-reservation-client/create-a-reservation-client.component';
import { AddAnswerToComplaintComponent } from './components/add-answer-to-complaint/add-answer-to-complaint.component';
import { AddReasonForDeletingRequestComponent } from './components/add-reason-for-deleting-request/add-reason-for-deleting-request.component';
import { AddAnswerForDecliningRegistrationComponent } from './components/add-answer-for-declining-registration/add-answer-for-declining-registration.component';
import { ReservationsPageClientComponent } from './components/reservations-page-client/reservations-page-client.component';
import { FavorCalendarComponent } from './components/favor-calendar/favor-calendar.component';
import { ReportForInstructorComponent } from './components/report-for-instructor/report-for-instructor.component';
import { ReportForInstructorCalendarComponent } from './components/report-for-instructor-calendar/report-for-instructor-calendar.component';

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
    ChangeAdministratorsPasswordComponent,
    SuperiorAdministratorProfileComponent,
    AddNewAdministratorComponent,
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
    ClientProfileForOwnerComponent,
    ClientNavbarComponent,
    CottagesPageClientComponent,
    ShipsPageClientComponent,
    InstructorsPageClientComponent,
    CottageProfileClientComponent,
    ShipProfileClientComponent,
    InstructorProfileClientComponent,
    CottagesReservationsPageClientComponent,
    ShipsReservationsPageClientComponent,
    InstructorsReservationsPageClientComponent,
    ShipProfileComponent,
    ShipOwnerProfileComponent,
    ShipHotOfferComponent,
    ShipReservationsComponent,
    ShipOwnerReservationsComponent,
    ShipCalendarComponent,
    ShipOwnerReportComponent,
    CottageOwnerReportComponent,
    AddNewShipComponent,
    AddReportComponent,
    AddShipReservationReportComponent,
    MapComponent,
    InstructorProfileComponent,
    FavorProfileComponent,
    AddNewFavorComponent,
    AddFavorReservationReportComponent,
    CreateAReservationClientComponent,
    AddAnswerToComplaintComponent,
    AddReasonForDeletingRequestComponent,
    AddAnswerForDecliningRegistrationComponent,
    ReservationsPageClientComponent,
    FavorCalendarComponent,
    ReportForInstructorComponent,
    ReportForInstructorCalendarComponent
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
