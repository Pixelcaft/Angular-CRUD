import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  buttonText: string = "Add User"; 
  routerLink: string = "/add-user"; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtonText();
      }
    });
  }

  navigate() {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.routerLink = "/add-user";
    } else if (currentUrl === '/add-user') {
      this.routerLink = "/";
    } else if (currentUrl.startsWith('/user/')) {
      this.routerLink = "/";
    } else if (currentUrl.startsWith('/update-user')) {
      this.routerLink = "/"
    }

    this.router.navigate([this.routerLink]);
  }

  private updateButtonText() {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.buttonText = "Add User";
    } else if (currentUrl === '/add-user') {
      this.buttonText = "Back";
    } else if (currentUrl.startsWith('/user/')) {
      this.buttonText = "Back"
    } else if (currentUrl.startsWith('/update-user')) {
      this.buttonText = "Back"
    }
  }
}

