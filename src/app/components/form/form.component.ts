import { Component } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public buttonText: string = 'Add User';
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

  private createEmptyUser() {
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

  public submitForm() {
    if (this.inFormValid()) {
      const UserData = this.user;

      if (this.isUpdateMode) {
        const userId = this.activatedRoute.snapshot.params['id'];
        this.localStorageService.updateUserDataById(userId, UserData);
      } else {
        this.localStorageService.addFormData(UserData);
      }

      this.backIndexPagina();
    } else {
      alert('Fill in all required fields before submitting the form.');
    }
  }

  private inFormValid(): boolean {
    return (
      !!this.user.firstname &&
      !!this.user.lastname &&
      !!this.user.streetname &&
      !!this.user.housenumber &&
      !!this.user.residence &&
      !!this.user.postalcode
    );
  }

  private backIndexPagina() {
    this.router.navigate(['/']);
  }
}
