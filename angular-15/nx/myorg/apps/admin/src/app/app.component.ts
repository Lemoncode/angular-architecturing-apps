import { Component } from '@angular/core';

@Component({
  selector: 'myorg-root',
  template: `
  <myorg-banner title="Welcome to our admin app."> </myorg-banner>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'admin';
}
