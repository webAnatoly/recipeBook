import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  isDropdownVisible = false;
  @Input() recipeDetail: Recipe = {name: '', description: '', imagePath: ''};

  constructor() { }

  ngOnInit(): void {
  }

  onClickDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
