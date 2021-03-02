import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Description', 'https://cdn.kqed.org/wp-content/uploads/sites/24/2013/09/PumpkinHoneyBread.jpg'),
    new Recipe('A Test Recipe2', 'Description2', 'https://cdn.stocksnap.io/img-thumbs/960w/food-recipe_G8QICMKLUV.jpg'),
  ];

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // slice() вернёт новый массив
  }
}
