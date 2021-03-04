import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div class="overlay">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
