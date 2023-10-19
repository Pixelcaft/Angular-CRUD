import { Component, OnInit } from '@angular/core';
import {
  faTrashCan,
  faInfo,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public faPencil = faPencil;
  public faInfo = faInfo;
  public faTrashCan = faTrashCan;

  public users!: User[];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  private getUsers(): void {
    this.users = this.userService.getUsers()
  }

  public viewUserDetails(user: User): void {
    const userId = user.id;

    if (userId) {
      this.router.navigate(['/user', userId]);
    }
  }

  public removeUser(user: User): void {
    const userId = user.id;

    if (userId) {
      this.userService.deleteUser(userId);
      this.getUsers();
    }
  }

  public editeUser(user: User): void {
    const userId = user.id;

    if (userId) {
      this.router.navigate(['/update-user', userId]);
    }
  }
}