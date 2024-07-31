import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.css']
})
export class UpdateBooksComponent implements OnInit {

  id!: number;
  book: Book = new Book();
  constructor(
   private bookService:BookService,
  private route:ActivatedRoute,
  private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bookService.getBookById(this.id).subscribe(data =>{
      this.book = data;
    }, error => console.error());
    
  }

  onSubmit(): void {
    this.bookService.updateBook(this.id, this.book).subscribe(
      data => {
        // Show SweetAlert notification on successful update
        Swal.fire({
          title: 'Success!',
          text: 'Your Book details updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Navigate to the book list after closing the alert
          this.goToBookList();
        });
      },
      error => {
        console.log(error);
        // Show SweetAlert notification on error
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating the book details.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  goToBookList(){
    this.router.navigate(['/books'])
  }

}

