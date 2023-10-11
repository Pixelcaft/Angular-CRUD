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
  public faPencil = faPencil;
  public faInfo = faInfo;
  public faTrashCan = faTrashCan;

  private routerLink: string = '';
  public users?: any[];

  constructor(
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.users = this.localStorageService.getAllUserData();
  }

  public viewUserDetails(userId: number) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.router.navigate(['/user', userId]);
    }
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }

  public removeUser(userId: number) {
    this.localStorageService.removeUserById(userId);

    this.users = this.localStorageService.getAllUserData();
  }

  public updateUser(userId: number) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.router.navigate(['/update-user', userId]);
    }
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
