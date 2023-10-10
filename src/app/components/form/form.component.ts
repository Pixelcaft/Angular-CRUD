import { Component } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  buttonText: string = 'Add User';
  routerLink: string = '/form';
  isUpdateMode: boolean = false;

  firstname: string = '';
  infix: string = '';
  lastname: string = '';
  streetname: string = '';
  housenumber?: number;
  addition: string = '';
  residence: string = '';
  postalcode: string = '';

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe((UrlSegment) => {
      if (
        UrlSegment &&
        UrlSegment.length > 0 &&
        UrlSegment[0].path === 'update-user'
      ) {
        const userId = +this.activatedRoute.snapshot.params['id'];
        const userData = this.localStorageService.getUserDataById(userId);

        if (userData) {
          this.firstname = userData.firstname;
          this.infix = userData.infix;
          this.lastname = userData.lastname;
          this.streetname = userData.streetname;
          this.housenumber = userData.housenumber;
          this.addition = userData.addition;
          this.residence = userData.residence;
          this.postalcode = userData.postalcode;
        }

        this.isUpdateMode = true;
        this.buttonText = 'Update';
      }
    });
  }

  submitForm() {
    const UserData = {
      firstname: this.firstname,
      infix: this.infix,
      lastname: this.lastname,
      streetname: this.streetname,
      housenumber: this.housenumber,
      addition: this.addition,
      residence: this.residence,
      postalcode: this.postalcode,
    };
    
    if (this.isUpdateMode) {
      const userId = +this.activatedRoute.snapshot.params['id'];
      this.localStorageService.updateUserDataById(userId, UserData);
    } else {
      this.localStorageService.addFormData(UserData);
    }


    this.backIndexPagina();
  }

  backIndexPagina() {
    const currentUrl = this.router.url;

    if (currentUrl === '/add-user') {
      this.routerLink = '/';
    } else if (currentUrl.startsWith('/update-user')) {
      this.routerLink = '/'
    }

    this.router.navigate([this.routerLink]);
  }
}
