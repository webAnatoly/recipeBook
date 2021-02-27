import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDropdownVisible = false;
  isMobileMenuVisible = false;

  constructor(public eRef: ElementRef) { }

  ngOnInit(): void {
  }

  onClickDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Отслеживает клик на документе и если меню открыто (и клик был не на меню), то закрывает меню.
  @HostListener('document:click', ['$event'])
  onClickAnyWhere(event: Event): void {

    if (this.isDropdownVisible) {
      const target = event.target as HTMLElement;
      const dropdown = this.eRef.nativeElement.querySelector('.dropdown');

      if (!dropdown.contains(target)) {
        this.isDropdownVisible = false;
      }
    }
  }

  onClickMobileMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
