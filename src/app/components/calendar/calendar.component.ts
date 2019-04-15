import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/core/userDetails';
import { VacationProviderService } from 'src/app/services/vacation-provider.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private events: any[];
  private options: any;
  private currentUser: User;

  constructor(private authenticationService: AuthenticationService, private vacationProviderService: VacationProviderService) { }

  //https://www.primefaces.org/primeng/#/fullcalendar
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;

    this.vacationProviderService.getAllVacationsForAnUser(this.currentUser.id).subscribe(res => {
      let approvedRequests = res.filter(request => request.vacationRequestStatus === 'APPROVED');
      //de convertit astea in formatul unui event
      console.warn('approved requests', approvedRequests);
      this.events = [];
      for (let i=0;i<approvedRequests.length; ++i) {
        this.events.push({
          "title": approvedRequests[i].vacationRequestType,
          "start": approvedRequests[i].startDate,
          "end": approvedRequests[i].endDate
        })
      }
    })

    this.options = {
      header: {
          left: 'today,prev,next',
          right: 'title',
          center: 'month,agendaWeek'
      }
    }
  }

}
