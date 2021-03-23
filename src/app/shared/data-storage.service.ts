import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { assert as tAssert, object as tObject, number as tNumber, string as tString, array as tArray } from 'superstruct';
import { Ingredient } from './ingredient.model';

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
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            // если ингредиентов нет, то создать и проинициализировать пустым массивом
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
            return recipe;
          });
        }),
      )
      .subscribe(recipes => {

        // Описание структуры данных, которые ожидаю получить с сервера.
        // Это описание повторяет структуру Recipe[]
        const RecipeValidSchema = tArray(
          tObject({
            name: tString(),
            description: tString(),
            imagePath: tString(),
            ingredients: tArray(
              tObject(
              {
                name: tString(),
                amount: tNumber()
              })
            ),
          })
        );

        try {
          tAssert(recipes, RecipeValidSchema); // Проверка, что полученные данные с сервера, соответствуют типу Recipe[]
          this.recipeService.setRecipes(recipes);
        } catch (e) {
          console.error(e);
        }

      });
  }
}
