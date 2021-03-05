import { Component, OnInit } from '@angular/core';
import { GlobalStateService, MyState } from './shared/global-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOverlayVisibly = false;

  constructor(private globalState: GlobalStateService) {}

  ngOnInit(): void {
    this.globalState.state.subscribe((state: MyState) => {
      this.isOverlayVisibly = state.showSpinner;
    });
  }
}
