import { Component, OnInit } from '@angular/core';
import { VacationProviderService } from 'src/app/services/vacation-provider.service';

@Component({
  selector: 'leave-request-approval',
  templateUrl: './leave-request-approval.component.html',
  styleUrls: ['./leave-request-approval.component.css']
})
export class LeaveRequestApprovalComponent implements OnInit {
  private usersRequests: any[] = [];
  private msgs: any[] = [];

  constructor(private vacationProviderService: VacationProviderService) { }

  ngOnInit() {
    //get users requests from server (toate care sunt pending)
    this.vacationProviderService.getAllVacationRequests().subscribe(res => {
        this.usersRequests = res;
        for (let i = 0; i < this.usersRequests.length; ++i)
          if (this.usersRequests[i].user.username==="petrecatalin21")
          this.usersRequests[i].user.username = "user";
        this.usersRequests = this.usersRequests.filter(ur => ur.vacationRequestStatus === 'PENDING');
    })
  }

  private acceptRequest(request: any) {
    //status to APPROVED -> update pe server
    request.vacationRequestStatus = 'APPROVED';
    this.vacationProviderService.updateVacationRequestStatus(request.id, 'APPROVED').subscribe( res => {
        this.msgs.push({severity:'success', summary:'Request Approves', detail:'Request Succesfully Approved!'});
    });
    this.usersRequests = this.usersRequests.filter(ur => ur !== request); //elimina din lista cu usersRequests
  }

  private rejectRequest(request: any) {
    //status to REJECTED/deny -> update pe server
    request.vacationRequestStatus = 'REJECTED';
    this.vacationProviderService.updateVacationRequestStatus(request.id, 'REJECTED').subscribe( res => {
        this.msgs.push({severity:'success', summary:'Request Rejected', detail:'Request Succesfully Rejected!'});
    });
    this.usersRequests = this.usersRequests.filter(ur => ur !== request); //elimina din lista cu usersRequests
  }

}
