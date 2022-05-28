import { createAction, props } from '@ngrx/store';
import { Book } from '../book-list/books.model';

export const addBook = createAction(
    '[Book List] Add book',
    props<{ bookId: string }>()
);

export const removeBook = createAction(
    '[Book Collection] Remove book',
    props<{ bookId: string }>()
);

export const retrievedBookList = createAction(
    '[Book List/API] Retrieve Books Success',
    props<{ books: Book[] }>()
);
