import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full', },
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // Now since we are in an extra module here and we want to get this into our main module,
  // into our AppModule, we need to export this readily configured router.

})
export class AppRoutingModule { }
