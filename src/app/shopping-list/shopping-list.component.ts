import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Oranges', 3),
    new Ingredient('Strawberries', 12),
    new Ingredient('Apple', 4),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
    new Ingredient('Watermelon', 1),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
