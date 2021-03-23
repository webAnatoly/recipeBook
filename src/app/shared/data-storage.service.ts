import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { assert as tAssert, object as tObject, number as tNumber, string as tString, array as tArray } from 'superstruct';
import { Observable } from 'rxjs';

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

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
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
        tap(recipes => { // The tap operator allows us to execute some code here in place
          // without altering the data that is funneled through that observable.

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
        }),
      );
  }
}
