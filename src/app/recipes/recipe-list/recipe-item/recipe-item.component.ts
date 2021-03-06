import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = {name: '', description: '', imagePath: '', ingredients: [{name: '', amount: 0}] };
  @Input() recipeId = 0;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
}
