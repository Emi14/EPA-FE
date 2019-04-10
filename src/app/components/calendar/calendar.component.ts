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
    console.warn('currentUser', this.currentUser);

    //ia cocediile aprobate ale utilizatorului curent (get by id)
    this.vacationProviderService.getAllVacationsForAnUser(this.currentUser.id).subscribe(res => {
      let acceptedRequests = res.filter(request => request.vacationRequestStatus === 'ACCEPTED');
      //de convertit astea in formatul unui event
    })

    this.events = [
      {
          "title": "All Day Event", //la titlu o sa pun tipul concediului
          "start": "2019-04-01"
      },
      {
          "title": "Long Event",
          "start": "2019-04-07",
          "end": "2019-04-10"
      },
      {
          "title": "Repeating Event",
          "start": "2019-04-09"
      },
      {
          "title": "Repeating Event",
          "start": "2019-04-16"
      },
      {
          "title": "Conference",
          "start": "2019-04-11",
          "end": "2019-04-13"
      }
    ];

    this.options = {
      header: {
          left: 'today,prev,next',
          right: 'title',
          center: 'month,agendaWeek'
      }
    }
  }

}
