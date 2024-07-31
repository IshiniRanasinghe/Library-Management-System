//app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component'; // Adjust path as needed
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBooksComponent } from './update-books/update-books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'books', component: BookListComponent },
  {path:'add-books', component: AddBookComponent}, 
  {path: 'update-books/:id', component:UpdateBooksComponent},
  {path: 'book-details/:id', component:BookDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
