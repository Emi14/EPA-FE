import { Component, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/core/dashboardCard';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dashboardCards: DashboardCard[];
  private cardSize: string;
  private currentUserRole: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUserRole = this.authenticationService.currentUserRole;
    if (this.currentUserRole === 'User') {
      this.dashboardCards = [
        {
        title: 'Calendar',
        imageSrc: '../../../assets/social-media-content-calendar.jpg',
        routerLink: '/calendar',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!`,
        footer: 'Footer orb ed'
        },
        {
          title: 'Leave Request',
          imageSrc: '../../../assets/leave-request.jpg',
          routerLink: '/request',
          description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
          quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!`,
          footer: 'Footer orb ed'
        }
      ];
    }

    if (this.currentUserRole === 'Admin') {
      this.dashboardCards = [
        {
        title: 'User Accounts Management',
        imageSrc: '../../../assets/user-account.jpg',
        routerLink: '/users',
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!`,
        footer: 'Footer orb ed'
        },
        {
          title: 'Leave Request Approval',
          imageSrc: '../../../assets/leave-request-approval.png',
          routerLink: '/approval',
          description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
          quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!`,
          footer: 'Footer orb ed'
        }
      ];
    }

    this.cardSize = 'p-col-' + 12/this.dashboardCards.length;
  }

}
