import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user.class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public buttonText: string = 'Add User';
  private isUpdateMode: boolean = false;
  public user!: User | null;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.activatedRoute.url.subscribe(() => {
      const userId = this.activatedRoute.snapshot.params['id'];

      if (userId) {
        this.user = this.userService.getUserById(userId);
        this.isUpdateMode = true;
        this.buttonText = 'Update';
      } else {
        this.createEmptyUser();        
      }
    });
  }

  private createEmptyUser(): void {
    this.user = new User({
      id: new Date().getTime().toString(),
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

  public submitForm(): void {
    if (this.isFormValid()) {

      if (this.isUpdateMode) {
        this.userService.updateUser(this.user!);
      } else {
        this.userService.addUser(this.user!);
      }
      this.router.navigate(['/']);
    } else {
      alert('Fill in all required fields before submitting the form.');
    }
  }

  private isFormValid(): boolean {
    return (
      !!this.user!.firstname &&
      !!this.user!.lastname &&
      !!this.user!.streetname &&
      !!this.user!.housenumber &&
      !!this.user!.residence &&
      !!this.user!.postalcode
    );
  }
}
