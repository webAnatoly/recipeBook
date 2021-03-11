import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  isDropdownVisible = false;
  recipeDetail: Recipe = {name: '', description: '', imagePath: '', ingredients: [{name: '', amount: 0}] };
  recipeID: number | null = null;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

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

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route})
      .catch(error => console.error(error));
  }

  onDeleteRecipe(): void {
    if (this.recipeID !== null) {
      this.recipeService.deleteRecipe(this.recipeID);
      this.router.navigate(['/recipes'], )
        .catch(error => console.error(error));
    }
  }
}
