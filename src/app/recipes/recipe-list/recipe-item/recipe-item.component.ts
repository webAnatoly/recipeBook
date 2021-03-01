import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeName = '';
  @Input() recipeDescription = '';
  @Input() recipeImagePath = '';

  constructor() { }

  ngOnInit(): void {
  }

}
