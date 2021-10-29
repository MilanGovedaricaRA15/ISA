import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './registerForm/registerForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CottageProfileComponent } from './cottage-profile/cottage-profile.component';
import { CottageOwnerProfileComponent } from './cottage-owner-profile/cottage-owner-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    CottageProfileComponent,
    CottageOwnerProfileComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
