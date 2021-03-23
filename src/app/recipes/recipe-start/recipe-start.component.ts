import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss']
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  isRecipesExists = false;
  subscriptionRecipeChanged!: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isRecipesExists = Boolean(this.recipeService.amount);
    this.subscriptionRecipeChanged = this.recipeService.recipeChanged.subscribe((recipe) => {
      this.isRecipesExists = Boolean(this.recipeService.amount);
    });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route})
      .catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    this.subscriptionRecipeChanged.unsubscribe();
  }
}
