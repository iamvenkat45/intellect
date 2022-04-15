import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  searchValue: string;
  usersList = <any>[];
  constructor(private readonly userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.users.subscribe((usersData: any) => {
      for (const key in usersData[0]) {
        if (typeof usersData[0][key] === 'object') {
          this.usersList.push(usersData[0][key]);
        }
      }
    });
  }

  editUser(item: any) {
    event?.stopImmediatePropagation();
    console.log('item', item);
    this.router.navigate(['dashboard/edit-user', 1]);
  }

  addUser() {
    this.router.navigate(['dashboard/edit-user']);
  }

}
