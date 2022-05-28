# Register Store Model

Import the *StoreModule* from *@ngrx/store* and the *books.reducer* and *collection.reducer* file.

```ts
import { booksReducer } from './state/books.reducer';
import { collectionReducer } from './state/collection.reducer';
import {  StoreModule} from '@ngrx/store';

```

Add the *StoreModule.forRoot* function in the imports array of your *AppModule* with an object containing the *books* and *booksReducer*, as well as the *collection* and *collectionReducer* that manage the state of the book list and the collection. The *StoreModule.forRoot()* method registers the global providers needed to access the *Store* throughout your application.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';

import { booksReducer } from './state/books.reducer';
import { collectionReducer } from './state/collection.reducer';
import {  StoreModule} from '@ngrx/store';
import { BookCollectionComponent } from './book-collection/book-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCollectionComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      books: booksReducer,
      collection: collectionReducer,
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

Create a new file in state named *app.state.ts*. Define the state as a list of books and a list of collection books' IDs.

Create `library/src/app/state/app.state.ts`

```ts
import { Book } from '../book-list/books.model';

export interface AppState {
    books: ReadonlyArray<Book>;
    collection: ReadonlyArray<string>;
}
```