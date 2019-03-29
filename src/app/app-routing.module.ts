import { CalendarComponent } from './components/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './core/userRoles';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { LeaveRequestApprovalComponent } from './components/leave-request-approval/leave-request-approval.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent , canActivate: [AuthGuard], data: { roles: [Role.User] }},
  { path: 'request', component: LeaveRequestComponent , canActivate: [AuthGuard], data: { roles: [Role.User] }},
  { path: 'users', component: AccountManagementComponent , canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
  { path: 'approval', component: LeaveRequestApprovalComponent , canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
  { path: '**', redirectTo: 'login' }
];

//canActivate: [AuthGuard]  --> need to be logged in to acces that route
//look here for AuthGuard with one specific role --> data: { roles: [Role.Admin] }  http://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example#app-module-ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
