import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerObj: User = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    if (this.registerObj.username && this.registerObj.email && this.registerObj.password) {
      console.log('Attempting to register with:', this.registerObj);
      this.authService.register(this.registerObj).subscribe(
        (response) => {
          if (response) {
            console.log('Registration successful', response);
            Swal.fire({
              icon: 'success',
              title: 'Registration successful!',
              text: 'Please login.',
            }).then(() => {
              this.router.navigate(['login']);
            });
          } else {
            console.error('Registration failed: No response from server');
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: 'Please try with diffrent email or username',
            });
          }
        },
        (error) => {
          console.error('Registration failed', error);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'Please try again.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete fields',
        text: 'Please fill out all fields.',
      });
    }
  }
}
