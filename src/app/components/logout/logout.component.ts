import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private currentUserRole: string;
  private currentUserName: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUserName = this.authenticationService.currentUserValue.username;
    this.currentUserRole = this.authenticationService.currentUserRole;
  }

  private logoutUser(): void {
    this.authenticationService.logout();
  }

}

