import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: `
    <div>Waring template alert</div>
  `,
  // styleUrls: ['./warning-alert.component.scss'],
  styles: [`
    p, div {
      padding: 20px;
      background-color: mistyrose;
      border: 1px solid burlywood;
    }
  `]
})
export class WarningAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
