import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userId?: number;
  userDetails: any;

  constructor(private route: ActivatedRoute, private localStorageService: LocalstorageService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];

      this.userDetails = this.localStorageService.getUserDataById(this.userId);
    })    
  }

}
