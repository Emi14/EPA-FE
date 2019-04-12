import { Component, OnInit } from '@angular/core';
import { UserProviderService } from 'src/app/services/user-provider.service';
import { User } from 'src/app/core/userDetails';
import { Role } from 'src/app/core/userRoles';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  private userList: User[] = this.userProviderService.getBaseUsers();
  private msgs: any[] = [];
  private display: boolean = false;
  
  constructor(private userProviderService: UserProviderService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.userList = this.userList.filter(user => user.role === Role.User);
    this.userProviderService.getUsers().subscribe(result => {
      let users = result;
      for (let user of users) {
        if (user.role === "USER") user.role = Role.User;
        else if (user.role === "ADMIN") user.role = Role.Admin;
      }
      this.userList = this.userList.concat(users);
    });
  }

  private deleteUser(userId: number): void {
    console.warn('userId', userId);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      accept: () => {
        //request de DELETE
        this.userProviderService.deleteUser(userId).subscribe(res => {
            this.msgs.push({severity:'success', summary:'User Deleted', detail:'User Succesfully Deleted!'});
            this.userList = this.userList.filter(user => user.id !== userId); //remove deleted user from the list
        })    
      },
      reject: () => {}
    });
  }

  private addUser(): void {
    this.display = true;
  }

  private saveUser(): void {
    let newUser: User = new User();
    let userName = <HTMLInputElement>(document.getElementById('username'));
    let password = <HTMLInputElement>(document.getElementById('password'));
    let freeDays = <HTMLInputElement>(document.getElementById('freeDays'));
    let workHome = <HTMLSelectElement>(document.getElementById('workHome'));

    newUser.username = userName.value;
    newUser.password  = password.value;
    newUser.daysOff = +freeDays.value;
    if (workHome.value === 'true') newUser.workFromHome = true;
    else newUser.workFromHome = false;
    newUser.role = "USER";
    newUser.vacationRequests = [];
    console.warn('newUser', JSON.stringify(newUser));

    this.userProviderService.addUser(newUser).subscribe(res => {
      this.display = false;
      this.clearAddUserFormElements();
      this.msgs.push({severity:'success', summary:'User Saved', detail:'User Succesfully Saved!'});
    });
  }

  private cancelAddUser(): void {
    this.display = false;
    this.clearAddUserFormElements();
  }

  private clearAddUserFormElements(): void {
    let userName = <HTMLInputElement>(document.getElementById('username'));
    userName.value = '';
    let password = <HTMLInputElement>(document.getElementById('password'));
    password.value = '';
    let freeDays = <HTMLInputElement>(document.getElementById('freeDays'));
    freeDays.value = '';
  }

  private saveChanges(): void { 
    console.warn('users updated', this.userList); //aici trebuie sa facem update la tot din userList (fiecare user in parte??)

    //REQUEST de UPDATE
    this.msgs.push({severity:'success', summary:'Changes Saved', detail:'Changes have been Saved!'});
  }

}
