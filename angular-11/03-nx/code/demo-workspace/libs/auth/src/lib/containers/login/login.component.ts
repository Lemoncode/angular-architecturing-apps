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
    this.store.subscribe((e) => {
      console.log(e['auth']);
    })
  }

  login() {
    this.store.dispatch(login());
  }

}
