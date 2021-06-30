import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: (action) => {
          return this.authService
            .login()
            .pipe(map((u) => AuthActions.loginSuccess({ auth: { ...u } })));
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  constructor(private authService: AuthService, private actions$: Actions) {}
}
