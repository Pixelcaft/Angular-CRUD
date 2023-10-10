import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public buttonText: string = 'Add User';
  private routerLink: string = '/form';
  private isUpdateMode: boolean = false;
  public user!: User;

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe(() => {
        const userId = this.activatedRoute.snapshot.params['id'];

        if (userId) {
          this.getUserById(userId);
          this.isUpdateMode = true;
          this.buttonText = 'Update';
        } else {
          this.createEmptyUser();
        }
      
    });
  }
  private getUserById(userId: string) {
    const userData = this.localStorageService.getUserDataById(userId);

    if (userData) {
      this.user = new User(userData);
    }
  }

  private createEmptyUser(){
    this.user = new User({
      firstname: '',
      infix: '',
      lastname: '',
      streetname: '',
      housenumber: '',
      addition: '',
      residence: '',
      postalcode: '',
    });
  }


  ngOnInit() {
  }

  submitForm() {
    if (this.isUpdateMode) {
      const userId = this.activatedRoute.snapshot.params['id'];
      this.localStorageService.updateUserDataById(userId, this.user);
    } else {
      this.localStorageService.addFormData(this.user);
    }

    this.backIndexPagina();
  }

  backIndexPagina() {
    this.router.navigate(['/']);
  }
}
