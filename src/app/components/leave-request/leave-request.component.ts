import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/core/userDetails';
import { VacationProviderService } from 'src/app/services/vacation-provider.service';

@Component({
  selector: 'leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  private freeDaysRemaining: number;
  private msgs: any[] = [];
  private currentUser: User;
  private currentUserRequests: any[] = [];

  constructor(private authenticationService: AuthenticationService, private vacationProviderService: VacationProviderService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    console.warn('currentUser', this.currentUser);
    this.freeDaysRemaining = this.currentUser.daysOff;

    this.getCurrentUserRequests();
  }

  private submitRequest(): void {
    let startDate = (<HTMLInputElement>(document.getElementById('startDate'))).value;
    let endDate = (<HTMLInputElement>(document.getElementById('endDate'))).value;
    let leaveRequestType = (<HTMLSelectElement>(document.getElementById('leaveRequestType'))).value;

    console.warn('startDate', startDate);
    console.warn('endDate', endDate);
    console.warn('leaveRequestType', leaveRequestType);

    let newLeaveRequest;
    newLeaveRequest.startDate = startDate;
    newLeaveRequest.endDate = endDate;
    newLeaveRequest.vacationRequestStatus = "PENDING";
    newLeaveRequest.vacationRequestType = leaveRequestType;

    //send to server leave request in admin approval list
    this.msgs.push({severity:'success', summary:'Request Sent', detail:'Request Succesfully Sent!'});


    (<HTMLInputElement>(document.getElementById('startDate'))).value = '';
    (<HTMLInputElement>(document.getElementById('endDate'))).value = '';
    (<HTMLSelectElement>(document.getElementById('leaveRequestType'))).value = 'Vacation';
  }

  private getCurrentUserRequests(): void {
    //get la server la requests dupa user id si populare currentUserRequests la subscribe
  }

}
