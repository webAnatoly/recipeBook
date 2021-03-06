import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full', },
  { path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: ':id', component: RecipeDetailComponent },
      // { path: ':id/edit', },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // Now since we are in an extra module here and we want to get this into our main module,
  // into our AppModule, we need to export this readily configured router.

})
export class AppRoutingModule { }
