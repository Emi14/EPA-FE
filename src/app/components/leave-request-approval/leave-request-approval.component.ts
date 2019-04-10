import { Component, OnInit } from '@angular/core';
import { VacationProviderService } from 'src/app/services/vacation-provider.service';

@Component({
  selector: 'leave-request-approval',
  templateUrl: './leave-request-approval.component.html',
  styleUrls: ['./leave-request-approval.component.css']
})
export class LeaveRequestApprovalComponent implements OnInit {
  private usersRequests: any[] = [];

  constructor(private vacationProviderService: VacationProviderService) { }

  ngOnInit() {
    //get users requests from server (toate care sunt pending)
    this.vacationProviderService.getAllVacationRequests().subscribe(res => {
        this.usersRequests = res;
        this.usersRequests = this.usersRequests.filter(ur => ur.vacationRequestStatus === 'PENDING');
    })
  }

  private acceptRequest(request: any) {
    //status to ACCEPTED -> update pe server
    this.vacationProviderService.updateVacationRequestStatus(request.id).subscribe( res => {

    });
    this.usersRequests = this.usersRequests.filter(ur => ur !== request); //elimina din lista cu usersRequests
  }

  private rejectRequest(request: any) {
    //status to REJECTED/deny -> update pe server
    this.vacationProviderService.updateVacationRequestStatus(request.id).subscribe( res => {

    });
    this.usersRequests = this.usersRequests.filter(ur => ur !== request); //elimina din lista cu usersRequests
  }

}
