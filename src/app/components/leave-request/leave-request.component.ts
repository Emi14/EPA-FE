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

    let newLeaveRequest: any = {};
    newLeaveRequest.startDate = startDate;
    newLeaveRequest.endDate = endDate;
    newLeaveRequest.vacationRequestStatus = "PENDING";
    newLeaveRequest.vacationRequestType = leaveRequestType;
    newLeaveRequest.user = {
      id: 1001, username: 'user', password: 'user', role: "USER", daysOff: this.freeDaysRemaining, workFromHome: false, "vacationRequests": []
    }

    const startDateAsDate = new Date(startDate);
    const endDateAsDate = new Date(endDate);
    let difference = this.dateDiffInDays(startDateAsDate,endDateAsDate);
    console.warn('differenceOfDays', difference);
    if (difference > this.freeDaysRemaining) {
      this.msgs.push({severity:'error', summary:'Not Enough Days', detail:'You do not have enough free days remaining!'});
    }
    else if (difference < 0) {
      this.msgs.push({severity:'error', summary:'', detail:'Start Date must be before End Date!'});
    }
    else {
      this.vacationProviderService.addVacationRequest(newLeaveRequest).subscribe(res => {
          this.msgs.push({severity:'success', summary:'Request Sent', detail:'Request Succesfully Sent!'});
      });
      (<HTMLInputElement>(document.getElementById('startDate'))).value = '';
      (<HTMLInputElement>(document.getElementById('endDate'))).value = '';
      (<HTMLSelectElement>(document.getElementById('leaveRequestType'))).value = 'Vacation';
    }       
    
  }

  private dateDiffInDays(a:Date, b:Date):number {
    // Discard the time and time-zone information.
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  private getCurrentUserRequests(): void {
    this.vacationProviderService.getAllVacationsForAnUser(this.currentUser.id).subscribe( res => {
        this.currentUserRequests = res;
    })
  }

}
