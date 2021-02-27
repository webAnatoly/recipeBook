import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  isDropdownVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
