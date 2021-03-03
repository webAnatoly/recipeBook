import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

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

  ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // возвращаем новую копию массива
  }
}
