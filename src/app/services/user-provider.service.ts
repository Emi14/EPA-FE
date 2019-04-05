import { Injectable, Inject } from '@angular/core';
import { User } from '../core/userDetails';
import { Role } from '../core/userRoles';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProviderService {

    private users: User[] = [ //get those from server
        { id: 1, username: 'admin', password: 'admin', role: Role.Admin, freeDays: 21, workFromHome: true },
        { id: 2, username: 'user', password: 'user', role: Role.User, freeDays: 21, workFromHome: true }
    ];

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    public getUsers(): User[] { //this will change to Observable<User[]>
        return this.users; 
    }

    public addUser(newUser: User): void {
        
    }

    public deleteUser(userId: number): void {

    }
}
