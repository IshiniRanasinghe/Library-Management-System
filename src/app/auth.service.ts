import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/signup'; 
  private apiLoginUrl = 'http://localhost:8080/api/signin'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.apiLoginUrl, credentials);
  }

  register(user: User): Observable<any> {
    const payload = {
      username: user.username,  
      email: user.email,
      password: user.password
    };
    console.log('Payload being sent:', payload); 
    return this.http.post<any>(this.apiUrl, payload)
      .pipe(
        tap(response => console.log('Register response:', response)),
        catchError(error => {
          console.error('Register error', error);
          return of(null);
        })
      );
  }
}
