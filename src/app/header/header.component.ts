import { Component, ElementRef, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMobileMenuVisible = false;

  constructor(public eRef: ElementRef, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onClickMobileMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
