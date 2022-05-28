# Components Build

```bash
ng g s book-list/books --skip-tests
```

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './books.model';
 
@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient) {}
 
  getBooks(): Observable<Array<Book>> {
    return this.http
      .get<{ items: Book[] }>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []));
  }
}
```

Update `library/src/app/book-list/book-list.component.html`

```html
<div
  class="book-item"
  *ngFor="let book of books"
>
  <p>{{book.volumeInfo.title}}</p><span> by {{book.volumeInfo.authors}}</span>
  <button
    (click)="add.emit(book.id)"
    data-test="add-button"
  >Add to Collection</button>
</div>
```

Update `library/src/app/book-list/book-list.component.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from './books.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  @Input() books!: Array<Book>;
  @Output() add = new EventEmitter();
}
```

```bash
ng g c book-collection --skip-tests
```

Update `library/src/app/book-collection/book-collection.component.html`

```html
<div class="book-item" *ngFor="let book of books">
    <p>{{book?.volumeInfo?.title}}</p><span> by {{book?.volumeInfo?.authors}}</span>
    <button (click)="remove.emit(book?.id)" data-test="remove-button">Remove from Collection</button>
</div>
```

Update `library/src/app/book-collection/book-collection.component.ts`

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book-list/books.model';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css'],
})
export class BookCollectionComponent {
  @Input() books!: Array<Book>;
  @Output() remove = new EventEmitter();
}
```

What we have built already are presentational components or dummy components.