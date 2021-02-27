import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // здесь массив, потому-что можно несколько файлов стилей подключать, если надо.
})
export class AppComponent implements AfterViewInit {
  // Бедем отслеживать изменение высоты <nav> в компоненте <app-header>
  @ViewChild( HeaderComponent )
  header!: HeaderComponent;

  marginTop = 80;

  constructor(private currentElemRef: ElementRef) {

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.computeMarginForMainElement();
  }

  computeMarginForMainElement(): void {
    this.marginTop = this.header.eRef.nativeElement.querySelector('nav').offsetHeight;
  }

  ngAfterViewInit(): void {
    // Получаем высоту элемента <nav> из компонента <app-header>
    // и на основе, полученной высоты задаём отступ элементу <main>
    const marginTop = this.header.eRef.nativeElement.querySelector('nav').offsetHeight;
    this.currentElemRef.nativeElement.querySelector('main').style.marginTop = marginTop + 'px';
  }
}
