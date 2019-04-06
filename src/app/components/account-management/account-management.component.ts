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
  private userList: User[];
  private msgs: any[] = [];
  private display: boolean = false;
  
  constructor(private userProviderService: UserProviderService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.userList = this.userProviderService.getUsers(); //change this with subscribe....    userProviderService is gonna return Observable<User[]>
    this.userList = this.userList.filter(user => user.role === Role.User);
  }

  private deleteUser(userId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      accept: () => {

        //request de DELETE
        this.msgs.push({severity:'success', summary:'User Deleted', detail:'User Succesfully Deleted!'});
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
    newUser.freeDays = +freeDays.value;
    if (workHome.value === 'true')
      newUser.workFromHome = true;
    else
      newUser.workFromHome = false;
    console.warn('newUser', newUser);

    //request de insert

    this.display = false;
    this.clearAddUserFormElements();
    this.msgs.push({severity:'success', summary:'User Saved', detail:'User Succesfully Saved!'});
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


    //REQUEST de UPDATE
    this.msgs.push({severity:'success', summary:'Changes Saved', detail:'Changes have been Saved!'});
  }

}
