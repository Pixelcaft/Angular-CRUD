import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user!: User;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const userDetails = this.localStorageService.getUserDataById(id);

      if (userDetails) {
        this.user = new User(userDetails);
      }
    });
  }
}
