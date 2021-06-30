import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button mat-button>
      <mat-icon>face</mat-icon>
      Click me!
    </button>

    <mat-checkbox>Check me!</mat-checkbox>
  `,
  styles: [
  ]
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
