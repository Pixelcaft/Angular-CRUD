import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  buttonText: string = "Add User"; 
  routerLink: string = "/form"; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtonText();
      }
    });
  }

  link() {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.routerLink = "/form";
    } else if (currentUrl === '/form' || currentUrl === '/user-info') {
      this.routerLink = "/";
    }

    this.router.navigate([this.routerLink]);
  }

  private updateButtonText() {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.buttonText = "Add User";
    } else if (currentUrl === '/form' || currentUrl === '/user-info') {
      this.buttonText = "Back";
    }
  }
}

