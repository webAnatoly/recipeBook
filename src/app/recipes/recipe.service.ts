import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'Description',
  //     'https://cdn.kqed.org/wp-content/uploads/sites/24/2013/09/PumpkinHoneyBread.jpg',
  //     [
  //       new Ingredient('Apple', 2),
  //       new Ingredient('Flour', 3),
  //     ]),
  //   new Recipe(
  //     'A Test Recipe2',
  //     'Description2',
  //     'https://cdn.stocksnap.io/img-thumbs/960w/food-recipe_G8QICMKLUV.jpg',
  //     [
  //       new Ingredient('Bread', 1),
  //       new Ingredient('Butter', 1),
  //     ]),
  // ];

  private recipes: Recipe[] = [];

  get amount(): number { // возвращает кол-во рецептов
    return this.recipes.length;
  }

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]): void {
    const recipesCopy = JSON.parse(JSON.stringify(recipes));
    this.recipes = recipesCopy;
    this.recipeChanged.next(recipesCopy);
  }

  getRecipes(): Recipe[] {
    return JSON.parse(JSON.stringify(this.recipes));
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

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(JSON.parse(JSON.stringify(this.recipes)));
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(JSON.parse(JSON.stringify(this.recipes)));
  }

  deleteRecipe(index: number): void {
    if (index < this.recipes.length) {
      this.recipes.splice(index, 1);
      this.recipeChanged.next(JSON.parse(JSON.stringify(this.recipes)));
    }
  }
}
