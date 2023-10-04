import { Component } from '@angular/core';
import { faTrashCan, faInfo, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  faPencil = faPencil;
  faInfo = faInfo;
  faTrashCan = faTrashCan;
  routerLink: string = '';

  constructor(private router: Router) {}

  userInfo() {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.routerLink = '/user-info';
    }

    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
