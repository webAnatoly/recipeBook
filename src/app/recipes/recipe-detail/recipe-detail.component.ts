import { Component, Input, OnInit } from '@angular/core';
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
  @Input() recipeDetail: Recipe = {name: '', description: '', imagePath: '', ingredients: [{name: '', amount: 0}] };

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeDetail = this.recipeService.getRecipe(+this.route.snapshot.params.id);

    this.route.params.subscribe((params) => {
      this.recipeDetail = this.recipeService.getRecipe(+params.id);
    });
  }

  onClickDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onClickToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }
}
