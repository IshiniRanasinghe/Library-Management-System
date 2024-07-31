// src/app/book-list/book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  

  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks() {
    this.bookService.getbookList().subscribe((data: Book[]) => {
      this.books = data;
    });
  }


  



  bookDetails(id: number){
    this.router.navigate([`book-details`,id]);  
  }
  updateBook(id: number) {
    this.router.navigate([`update-books`,id]);  
  }


deleteBook(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.bookService.deleteBook(id).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire(
            'Deleted!',
            'The book has been deleted.',
            'success'
          );
          this.getBooks();
        },
        error: (error) => {
          console.error(error);
          Swal.fire(
            'Error!',
            'There was an error deleting the book.',
            'error'
          );
        }
      });
    }
  });
}

  }

