import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationErrorInterceptor } from './interceptors/authentication-error-interceptor';
import { fakeBackendProvider } from './interceptors/fake-backend-interceptor';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PanelModule } from "primeng/panel";
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LeaveRequestApprovalComponent } from './components/leave-request-approval/leave-request-approval.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { UserProviderService } from './services/user-provider.service';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule, DropdownModule, ButtonModule, InputTextareaModule } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { VacationProviderService } from './services/vacation-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    CalendarComponent,
    LeaveRequestComponent,
    LeaveRequestApprovalComponent,
    AccountManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelModule,
    CardModule,
    CalendarModule,
    FullCalendarModule,
    TableModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    DialogModule
  ],
  providers: [
    AuthenticationService,
    UserProviderService,
    ConfirmationService,
    MessageService,
    VacationProviderService,
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
