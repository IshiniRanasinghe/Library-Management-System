import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (!this.credentials.username || !this.credentials.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete fields',
        text: 'Please fill out all fields.',
      });
      return;
    }
  
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigate(['/books']);
      },
      error => {
        console.log('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter the correct username or password!',
        });
      }
    );
  }
  
}
