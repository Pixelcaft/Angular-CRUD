import { Component } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public buttonText: string = 'Add User';
  private isUpdateMode: boolean = false;
  public user!: User;
  public userForm: FormGroup;

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      infix: [''],
      lastname: ['', Validators.required],
      streetname: ['', Validators.required],
      housenumber: ['', Validators.required],
      addition: [''],
      residence: ['', Validators.required],
      postalcode: ['', Validators.required],
    });

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
    if (this.userForm.valid) {
      const UserData = this.userForm.value;

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

  private backIndexPagina() {
    this.router.navigate(['/']);
  }
}
