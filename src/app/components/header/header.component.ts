import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public buttonText: string = 'Add User';
  public routerLink: string = '/add-user';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtonText();
      }
    });
  }

  public navigate(): void {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.routerLink = '/add-user';
    } else {
      this.routerLink = '/'
    }
    this.router.navigate([this.routerLink]);
  }

  private updateButtonText(): void {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.buttonText = 'Add User';
    } else {
      this.buttonText = 'Back'
    }
  }
}
