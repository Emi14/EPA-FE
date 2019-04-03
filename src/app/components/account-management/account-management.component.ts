import { Component, OnInit } from '@angular/core';
import { UserProviderService } from 'src/app/services/user-provider.service';
import { User } from 'src/app/core/userDetails';

@Component({
  selector: 'account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  private userList: User[];
  
  constructor(private userProviderService: UserProviderService) { }

  ngOnInit() {
    this.userList = this.userProviderService.getUsers(); //change this with subscribe....    userProviderService is gonna return Observable<User[]>
  }

}
