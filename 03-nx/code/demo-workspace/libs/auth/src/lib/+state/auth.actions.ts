import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';

export const login = createAction(
  '[Auth] Login'
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ auth: AuthEntity }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
