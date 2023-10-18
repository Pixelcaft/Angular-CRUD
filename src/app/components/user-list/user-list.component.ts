import { Component, OnInit } from '@angular/core';
import {
  faTrashCan,
  faInfo,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public faPencil = faPencil;
  public faInfo = faInfo;
  public faTrashCan = faTrashCan;

  private routerLink: string = '';
 public users!: User[];

  constructor(
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    const userData = this.localStorageService.getAllUserData();

    if (userData) {
      this.users = userData.map(userData => new User(userData));
    }
  }




  public viewUserDetails(userId: string) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.router.navigate(['/user', userId]);
    }
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }

  public removeUser(userId: string) {
    this.localStorageService.removeUserById(userId);

    const userToDelete = this.localStorageService.getAllUserData();

    if (userToDelete) {
      this.users = userToDelete.map(userToDelete => new User(userToDelete));
    }
  }

  public updateUser(userId: string) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.router.navigate(['/update-user', userId]);
    }
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
