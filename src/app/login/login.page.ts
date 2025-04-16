import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgrammesService } from '../services/programmes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(private programmesService: ProgrammesService, private router: Router) { }

  ngOnInit() {
    const sessionId = sessionStorage.getItem('JSESSIONID');
    console.log('Session ID:', sessionId); // Debug log
    if (sessionId) {
      this.router.navigate(['/homy']);
    }
  }

  login() {
    this.loading = true;
    this.errorMessage = '';
    console.log('Attempting login with username:', this.username); // Debug log

    this.programmesService.login(this.username, this.password).toPromise().then(response => {
      this.loading = false;
      console.log('Login response:', response); // Debug log

      if (!response.authenticated) {
        this.errorMessage = 'Authentication failed. Please check your username and password.';
      } else {
        const currentProviderDisplay = response.currentProvider?.display;
        console.log('Current provider display:', currentProviderDisplay); // Debug log

        localStorage.setItem('currentProviderDisplay', currentProviderDisplay);

        this.router.navigate(['/homy']);
      }
    }).catch(error => {
      this.loading = false;
      console.error('Login error:', error); // Debug log
      this.errorMessage = 'An error occurred during login. Please try again.';
    });
  }


}
