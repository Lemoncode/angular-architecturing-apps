import { Component, Input } from '@angular/core';

@Component({
  selector: 'myorg-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  @Input() title = '';
}
