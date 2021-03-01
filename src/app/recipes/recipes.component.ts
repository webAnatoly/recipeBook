import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  chosenRecipe: Recipe = {name: '', description: '', imagePath: ''};

  constructor() { }

  ngOnInit(): void {
  }

  handleChosenRecipe(recipe: Recipe): void {
    this.chosenRecipe = recipe;
  }
}
