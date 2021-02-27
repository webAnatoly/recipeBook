import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Description', 'https://cdn.kqed.org/wp-content/uploads/sites/24/2013/09/PumpkinHoneyBread.jpg'),
    new Recipe('A Test Recipe2', 'Description2', 'https://cdn.stocksnap.io/img-thumbs/960w/food-recipe_G8QICMKLUV.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
