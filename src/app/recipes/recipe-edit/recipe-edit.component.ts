import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  private editMode = false; // если false значит находимся в режиме создания нового рецепта
  private recipeID = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeID = +params.id;
      this.editMode = params.id != null; // если id рецепта не получен, значит находимся в режиме создания нового рецепта
      console.log('editMode: ', this.editMode);
    });
  }

}
