import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private events: any[];
  private options: any;

  constructor() { }

  //https://www.primefaces.org/primeng/#/fullcalendar
  ngOnInit() {
    this.events = [
      {
          "title": "All Day Event",
          "start": "2019-04-01"
      },
      {
          "title": "Long Event",
          "start": "2019-04-07",
          "end": "2019-04-10"
      },
      {
          "title": "Repeating Event",
          "start": "2019-04-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2019-04-16T16:00:00"
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
          center: 'month,agendaWeek,agendaDay'
      }
    }
  }

}
