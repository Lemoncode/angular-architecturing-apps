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
