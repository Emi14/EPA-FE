import { Injectable } from '@angular/core';
import { User } from '../core/userDetails';
import { Role } from '../core/userRoles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserProviderService {
    private baseUrl: string = 'https://api-epa.herokuapp.com/api/user';
    private baseUsers: User[] = [ //get those from server
        { id: 1, username: 'admin', password: 'admin', role: Role.Admin, daysOff: 21, workFromHome: true },
        { id: 2, username: 'user', password: 'user', role: Role.User, daysOff: 21, workFromHome: true }
    ];
    readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) { }

    public getBaseUsers(): User[] {
        return this.baseUsers;
    }

    public getUsers(): Observable<User[]> { 
        return <Observable<User[]>>this.http
                .get(this.baseUrl + '/getAll');
    }

    public addUser(newUser: User): Observable<any> {
        return this.http.post(this.baseUrl + '/save', newUser, this.httpOptions);
    }

    public updateUser(newUser: User): Observable<any> {
        return this.http.put(this.baseUrl + '/save' , newUser, this.httpOptions);
    }

    public deleteUser(id: number): Observable<any>  {
        return this.http.delete(this.baseUrl + '/delete/' + id.toString(), this.httpOptions);
    }
}
