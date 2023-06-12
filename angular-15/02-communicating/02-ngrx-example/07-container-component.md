# Container Component

Update `library/src/app/app.component.html`

```html
<h2>Books</h2>
<div *ngIf="books$ | async as books">
  <app-book-list class="book-list" [books]="books" (add)="onAdd($event)"></app-book-list>
</div>


<h2>My Collection</h2>
<div *ngIf="bookCollection$ | async as bookCollection">
  <app-book-collection class="book-collection" [books]="bookCollection" (remove)="onRemove($event)">
  </app-book-collection>
</div>
```

Update `library/src/app/app.component.ts`

```ts
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
  bookCollection$ = this.store.select(selectBookCollection)

  constructor(
    private booksService: BooksService,
    private store: Store<AppState>
  ) { }

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


```