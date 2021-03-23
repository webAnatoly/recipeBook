import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://ng-recipe-book-f9d45-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log('Recipes has saved on server', response);
      });
  }

  fetchRecipes(): void {
    this.http
      .get<Recipe[]>('https://ng-recipe-book-f9d45-default-rtdb.firebaseio.com/recipes.json')
      .subscribe(recipes => {
        console.log('fetched recipes', recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
