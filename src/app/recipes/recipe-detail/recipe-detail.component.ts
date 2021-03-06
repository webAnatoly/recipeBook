import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  isDropdownVisible = false;
  recipeDetail: Recipe = {name: '', description: '', imagePath: '', ingredients: [{name: '', amount: 0}] };
  recipeID = 0;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeID = +params.id;
      this.recipeDetail = this.recipeService.getRecipe(this.recipeID);
    });
  }

  onClickDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onClickToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }
}
