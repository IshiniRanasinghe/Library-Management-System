import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
    providedIn:'root'
})
export class UserService{
    private baseURL = "http://localhost:8080/api/users";

    constructor(private httpClient:HttpClient){
    }

    addUser(user:User): Observable<object>{
        return this.httpClient.post(`${this.baseURL}`,user);
    }


}