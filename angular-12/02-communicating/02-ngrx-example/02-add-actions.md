# Add Actions

Create a state management folder *state* (`src/app/state`), and within the new folder, name a new file *books.actions.ts* to describe the book actions. Book actions include the book list retrieval, and the add and remove book actions.

Create `book-list` component

```bash
$ ng g c book-list --skip-tests
```

Add the following file `library/src/app/book-list/books.model.ts`

```ts
export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors: Array<string>;
    };
}
```


Create `library/src/app/state/books.actions.ts`

```ts
import { createAction, props } from '@ngrx/store';

export const addBook = createAction(
    '[Book List] Add book',
    props<{ bookId }>()
);

export const removeBook = createAction(
    '[Book Collection] Remove book',
    props<{ bookId }>()
);

export const retrievedBookList = createAction(
    '[Book List/API] Retrieve Books Success',
    props<{ Book }>()
);

```