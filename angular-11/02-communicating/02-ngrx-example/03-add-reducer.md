# Add Reducer

Create a new file `library/src/app/state/books.reducer.ts`

```ts
import { createReducer, on } from '@ngrx/store';

import { retrievedBookList } from './books.actions';
import { Book } from '../book-list/books.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
    initialState,
    on(retrievedBookList, (state, { Book }) => [...Book])
);
```

Create another file named *collection.reducer.ts* in the state folder to handle actions that alter the user's book collection. 

Define a reducer function that handles the add action by appending the book's ID to the collection, including a condition to avoid duplicate book IDs. 

Define the same reducer to handle the remove action by filtering the collection array with the book ID.

Create `library/src/app/state/collection.reducer.ts`

```ts
import { createReducer, on, Action } from '@ngrx/store';
import { addBook, removeBook } from './books.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
    initialState,
    on(removeBook, (state, {bookId}) => state.filter((id) => id !== bookId)),
    on(addBook, (state, {bookId}) => {
        if (state.indexOf(bookId) > -1) {
            return state;
        }
        return [...state, bookId];
    })
);
```