import { Injectable, EventEmitter } from '@angular/core';

export interface MyState {
  showSpinner: boolean;
  anyValue: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private privateState: MyState = {
    showSpinner: false,
    anyValue: 'anyValue just for test',
  };

  state = new EventEmitter<object>();

  constructor() { }

  public getState(): MyState {
    return Object.assign({}, this.privateState);
  }

  startShowSpinner(): void {
    this.privateState.showSpinner = true;
    this.state.emit(this.getState());
  }

  finishShowSpinner(): void {
    this.privateState.showSpinner = false;
    this.state.emit(this.getState());
  }
}
