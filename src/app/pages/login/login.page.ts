import { Component } from '@angular/core';
import { ProgrammesService } from '../../services/programmes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private programmesService: ProgrammesService) {}

  login(username: string, password: string): void {
    this.programmesService.login(username, password).subscribe(response => {
      console.log('Login response:', response);
      if (response.authenticated) {
        // Handle successful login
        const sessionId = response.sessionId;
        console.log('Session ID:', sessionId);
      } else {
        console.log('Authentication failed. Response:', response);
      }
    }, error => {
      console.error('Login error:', error);  // Log any errors
    });
  }

  // ...existing code...
}
