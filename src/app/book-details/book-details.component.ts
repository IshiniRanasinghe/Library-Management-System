import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{

  id!: number
  book!: Book
  constructor(private route:ActivatedRoute,private bookService:BookService, private router:Router){
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.book = new Book();
    this.bookService.getBookById(this.id).subscribe(data =>{
      this.book = data;
    })
    
      
  }
  goBack(){
    this.router.navigate(['/books']);
   }


}
