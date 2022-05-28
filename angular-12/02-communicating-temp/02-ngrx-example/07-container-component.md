# Container Component

Update `library/src/app/app.component.html`

```html
<h2>Books</h2>
<app-book-list class="book-list" [books]="books$ | async" (add)="onAdd($event)"></app-book-list>

<h2>My Collection</h2>
<app-book-collection class="book-collection" [books]="bookCollection$ | async" (remove)="onRemove($event)">
</app-book-collection>
```

Update `library/src/app/app.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { selectBooks, selectBookCollection } from './state/books.selectors';
import { retrievedBookList, addBook, removeBook } from './state/books.actions';
import { BooksService } from './book-list/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  books$ = this.store.pipe(select(selectBooks));
  bookCollection$ = this.store.pipe(select(selectBookCollection));

  constructor(
    private booksService: BooksService,
    private store: Store
  ) {}

  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }

  ngOnInit(): void {
    this.booksService
    .getBooks()
    .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));
  }
}

```