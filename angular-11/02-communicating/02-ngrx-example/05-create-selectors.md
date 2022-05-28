# Create Selectors

Create the book list and collection selectors to ensure we get the correct information from the store. As you can see, the *selectBookCollection* selector combines two other selectors in order to build its return value.

Create `library/src/app/state/books.selectors.ts`

```ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { Book } from '../book-list/books.model';

export const selectBooks = createSelector(
  (state: AppState) => state.books,
  (books: Array<Book>) => books
);

export const selectCollectionState = createFeatureSelector<
  AppState,
  ReadonlyArray<string>
>('collection');

export const sleectBookCollection = createSelector(
    selectBooks,
    selectCollectionState,
    (books: Array<Book>, collection: Array<string>) => {
        return collection.map((id) => books.find((book) => book.id === id))
    });
```