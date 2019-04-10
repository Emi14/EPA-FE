import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class VacationProviderService {
  private baseUrl: string = 'https://api-epa.herokuapp.com/api/vacationRequest';
  readonly httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };

  constructor(private http: HttpClient) { }

  public getAllVacationRequests(): Observable<any[]> { 
    return <Observable<any[]>>this.http
            .get(this.baseUrl + '/getAll');
  }

  public getAllVacationsForAnUser(id: number): Observable<any[]> {
    return <Observable<any[]>>this.http
            .get(this.baseUrl + '/getAll/'+ id.toString());
  }

  public getAllPendingVacationsForAnUser(id: number): Observable<any[]> {
    return <Observable<any[]>>this.http
            .get(this.baseUrl + '/getAll/'+ id.toString() + '?onlyApproved=false');
  }

  public addVacationRequest(newVacation: any): Observable<any> {
    return this.http.post(this.baseUrl + 'addVacationRequest', newVacation, this.httpOptions);
  }

  public updateVacationRequestStatus(vacationRequestId: number, newVacation: any): Observable<any> {
    return this.http.put(this.baseUrl + 'updateVacationRequestStatus/' + vacationRequestId.toString(), newVacation, this.httpOptions);
  }

}
