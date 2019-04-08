import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'leave-request-approval',
  templateUrl: './leave-request-approval.component.html',
  styleUrls: ['./leave-request-approval.component.css']
})
export class LeaveRequestApprovalComponent implements OnInit {
  private usersRequests: any[] = [];

  constructor() { }

  ngOnInit() {
    //get users requests from server (toate care sunt pending)
    this.usersRequests.push({
      user: 'user',
      startDate: 'startDate',
      endDate: 'endDate',
      leaveRequestType: 'Vacation'
    })
  }

  private rejectRequest(request: any) {
    //status to rejected/deny -> update pe server
    //elimina din lista cu usersRequests   this.userRequests = this.userRequest.filter(ur => ur !== request);
  }

  private acceptRequest(request: any) {
    //status to accept -> update pe server
    //elimina din lista cu usersRequests   this.userRequests = this.userRequest.filter(ur => ur !== request);
  }

}
