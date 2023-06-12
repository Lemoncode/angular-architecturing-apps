import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksService } from './book-list/books.service';
import { AppState } from './state/app.state';
import { addBook, removeBook, retrievedBookList } from './state/books.actions';
import { selectBookCollection, selectBooks } from './state/books.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  constructor(private booksService: BooksService, private store: Store<AppState>) { }

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }

  ngOnInit(): void {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(
          retrievedBookList({ books })
        )
      );
  }
}
