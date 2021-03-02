import { Component, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMobileMenuVisible = false;
  @Output() featureSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(public eRef: ElementRef) { }

  ngOnInit(): void {
  }

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }

  onClickMobileMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
