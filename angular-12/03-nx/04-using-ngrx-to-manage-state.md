# Using NgRx to Manage State

## Overview

We have a lot of bolier plate but it's not doing nothing.

## Adding a Service Method

Update `./demo-workspace/libs/auth/src/lib/services/auth.service.ts`

```ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class AuthService {

  constructor() { }

  login() {
    return of({ id: 1, name: 'salas' });
  }
}

```

## Defining Actions

If we have a look into `./demo-workspace/libs/auth/src/lib/+state/auth.actions.ts`

```ts
import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

export const init = createAction('[Auth Page] Init');

export const loadAuthSuccess = createAction(
  '[Auth/API] Load Auth Success',
  props<{ auth: AuthEntity[] }>()
);

export const loadAuthFailure = createAction(
  '[Auth/API] Load Auth Failure',
  props<{ error: any }>()
);

```

We can notice that the action creators are already defined. Let's refactor to align with our 'business cases'

> Reference: https://ngrx.io/guide/store/actions

```ts
import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

// export const init = createAction('[Auth Page] Init');

export const login = createAction(
  '[Auth] Login'
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ auth: AuthEntity[] }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

```

## Defining Effects

Now let's update `./demo-workspace/libs/auth/src/lib/+state/auth.effects.ts` 

```diff
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AuthFeature from './auth.reducer';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
-     ofType(AuthActions.init),
+     ofType(AuthActions.login),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
-         return AuthActions.loadAuthSuccess({ auth: [] });
+         return AuthActions.loginSuccess({ auth: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
-         return AuthActions.loadAuthFailure({ error });
+         return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}

```

Ok now we have to get a little further in order to make this working, update `./demo-workspace/libs/auth/src/lib/+state/auth.models.ts`

```diff
export interface AuthEntity {
  id: string | number; // Primary ID
+ name: string;
}

```

Update `./demo-workspace/libs/auth/src/lib/+state/auth.actions.ts` to return a single entity

```diff
export const loginSuccess = createAction(
  '[Auth] Login Success',
- props<{ auth: AuthEntity[] }>()
+ props<{ auth: AuthEntity }>()
);
```

And use auth service in `./demo-workspace/libs/auth/src/lib/+state/auth.effects.ts`

```ts
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

```

## Defining and Initializing State and Defining the Reducer

Update `+state/auth.reducer.ts` 

```diff
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<AuthEntity> {
  selectedId?: string | number; // which Auth record has been selected
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<AuthEntity> = createEntityAdapter<AuthEntity>();

export const initialState: State = authAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const authReducer = createReducer(
  initialState,
- on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
+ on(AuthActions.login, (state) => ({ ...state, loaded: false, error: null })),
- on(AuthActions.loadAuthSuccess, (state, { auth }) =>
-   authAdapter.setAll(auth, { ...state, loaded: true })
- ),
+ on(AuthActions.loginSuccess, (state, { auth }) =>
+   authAdapter.setOne(auth, { ...state, loaded: true })
+ ),
- on(AuthActions.loadAuthFailure, (state, { error }) => ({ ...state, error }))
+ on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

```

```ts
const authReducer = createReducer(
  initialState,
  // on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.login, (state) => ({ ...state, loaded: false, error: null })),
  // on(AuthActions.loadAuthSuccess, (state, { auth }) =>
  //   authAdapter.setAll(auth, { ...state, loaded: true })
  // ),
  on(AuthActions.loginSuccess, (state, { auth }) =>
    authAdapter.setOne(auth, { ...state, loaded: true })
  ),
  // on(AuthActions.loadAuthFailure, (state, { error }) => ({ ...state, error }))
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error }))
);
```

## Dispatching an Action

Update as follows `./demo-workspace/libs/auth/src/lib/containers/login/login.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../+state/auth.actions';
import { AuthPartialState } from '../../+state/auth.reducer';

@Component({
  selector: 'demo-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AuthPartialState>) { }

  ngOnInit(): void {
    this.store.dispatch(login())
  }

}
```

## Building a Presentational Component

```bash
ng g c components/login-form --project=auth
```

Edit `./demo-workspace/libs/auth/src/lib/components/login-form/login-form.component.ts`

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'demo-workspace-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<any>();
}

```

Edit `./demo-workspace/libs/auth/src/lib/components/login-form/login-form.component.html`

```html
<button (click)="login.emit()">login</button>
```

Edit the container `./demo-workspace/libs/auth/src/lib/containers/login/login.component.html` to use the presentational component

```diff
-<p>login works!</p>
+<demo-workspace-login-form (login)="login()"></demo-workspace-login-form>

```

## NgRx in Action

Update `./demo-workspace/libs/auth/src/lib/containers/login/login.component.ts` to listen for the dispatched action.

```ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../+state/auth.actions';
import { AuthPartialState } from '../../+state/auth.reducer';

@Component({
  selector: 'demo-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AuthPartialState>) { }

  ngOnInit(): void {
    // this.store.dispatch(login())
    this.store.subscribe((e) => {
      console.log(e['auth']);
    })
  }

  login() {
    this.store.dispatch(login());
  }

}

```

And serve the application

```bash
$(npm bin)/nx run customer-portal:serve
```

Navigate to `http://localhost:4200/auth` and click on `login` opening the console shows that our user is loaded.
