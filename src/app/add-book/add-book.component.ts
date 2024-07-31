
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book = new Book();

  constructor(private bookService: BookService,
    private router:Router) {}

  ngOnInit(): void {

  }
          
  saveBook() {
    if (!this.book.title || !this.book.author) {
      Swal.fire({
        title: 'Incomplete Information',
        text: 'Please provide at least the title and author of the book.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      return;
    }
  
    Swal.fire({
      title: 'Save Book',
      text: 'Are you sure you want to save this book?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.addbook(this.book).subscribe({
          next: (data) => {
            console.log(data);
            Swal.fire({
              title: 'Saved!',
              text: 'The book has been saved successfully.',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.goToBookList();
            });
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error saving the book.',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }
  
  onSubmit() {
    console.log(this.book);
    this.saveBook();
  }
 goBack(){
  this.router.navigate(['/books']);
 }
 goToBookList() {
  this.router.navigate(['/books']);
}
}