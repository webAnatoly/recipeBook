import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Oranges', 3),
    new Ingredient('Strawberries', 12),
    new Ingredient('Apple', 4),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Banana', 2),
  ];

  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // возвращаем новую копию массива
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
