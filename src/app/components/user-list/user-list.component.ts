import { Component, OnInit } from '@angular/core';
import {
  faTrashCan,
  faInfo,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  faPencil = faPencil;
  faInfo = faInfo;
  faTrashCan = faTrashCan;

  routerLink: string = '';
  users?: any[];

  constructor(
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.users = this.localStorageService.getAllUserData();
  }

  viewUserDetails(userId: number) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.router.navigate(['/user', userId]);
    }
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }

  removeUser(userId: number) {
    this.localStorageService.removeUserById(userId);

    this.users = this.localStorageService.getAllUserData();
  }

  updateUser(userId: number) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.router.navigate(['/update-user', userId]);
    }
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
