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
  startedEditing = new Subject<number>();

  constructor() { }

  getIngredient(index: number): Ingredient | null {
    const result = this.ingredients[index];
    if (result) {
      return JSON.parse(JSON.stringify(result));
    }
    return null;
  }

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

  upgradeIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(JSON.parse(JSON.stringify(this.ingredients)));
  }

  deleteIngredient(index: number): void {
    if (index < this.ingredients.length) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(JSON.parse(JSON.stringify(this.ingredients)));
    }
  }
}
