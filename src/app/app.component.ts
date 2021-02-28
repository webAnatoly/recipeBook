import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'] // здесь массив, потому-что можно несколько файлов стилей подключать, если надо.
  styles: [`
    h3 {
      color: indianred;
    }
  `]
})
export class AppComponent {
  name = 'Tolik';
}
/*
Инструменты дебаггинга
1) Reading error messages
2) Using source maps
3) Dev tools extension for debugging (Augury) https://augury.rangle.io/

ну и console.log() никто не отменял.
*/
