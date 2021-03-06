import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Description',
      'https://cdn.kqed.org/wp-content/uploads/sites/24/2013/09/PumpkinHoneyBread.jpg',
      [
        new Ingredient('Apple', 2),
        new Ingredient('Flour', 3),
      ]),
    new Recipe(
      'A Test Recipe2',
      'Description2',
      'https://cdn.stocksnap.io/img-thumbs/960w/food-recipe_G8QICMKLUV.jpg',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Butter', 1),
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // slice() вернёт новый массив
  }

  getRecipe(id: number): Recipe {
    const recipe: Recipe = {name: '', description: '', imagePath: '', ingredients: [{ name: '', amount: 0 }]};

    if (this.recipes[id]) {
      return JSON.parse(JSON.stringify(this.recipes[id])); // возвращаем копию объекта Recipe
    }

    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }
}
