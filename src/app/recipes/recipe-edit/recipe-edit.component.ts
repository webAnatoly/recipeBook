import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  private editMode = false; // если false значит находимся в режиме создания нового рецепта
  private recipeID = 0;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeID = +params.id;
      this.editMode = params.id != null; // если id рецепта не получен, значит находимся в режиме создания нового рецепта
      this.initForm();
    });
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]); // by default we don't have any ingredients

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeID);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients,
    });
  }

  get ingredients(): FormArray { return this.recipeForm.get('ingredients') as FormArray; }

  onSubmit(): void {
    console.log('this.recipeForm', this.recipeForm);
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl(),
    }));
  }
}
