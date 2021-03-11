import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
              private router: Router,
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/), // Регулярка для отбора только цифр больше нуля
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get ingredients(): FormArray { return this.recipeForm.get('ingredients') as FormArray; }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeID, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['/recipes', this.recipeID]).catch(error => console.error(error));
  }

  /* Добавляет группу инпутов для ввода инфы об ингредиенте */
  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/), // Регулярка для отбора только цифр больше нуля
      ]),
    }));
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route}).catch(error => console.error(error));
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
