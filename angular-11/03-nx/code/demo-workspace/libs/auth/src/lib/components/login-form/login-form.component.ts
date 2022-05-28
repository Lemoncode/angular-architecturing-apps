import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'demo-workspace-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<any>();
}
