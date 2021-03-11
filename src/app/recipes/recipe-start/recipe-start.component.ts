import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss']
})
export class RecipeStartComponent implements OnInit {
  isRecipesExists = false;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isRecipesExists = Boolean(this.recipeService.amount);
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route})
      .catch(error => console.error(error));
  }
}
