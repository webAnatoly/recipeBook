import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './recipe-book/recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

/*
FormsModule позволяет использовать директиву [(ngModel)] в шаблоне, ну и видимо еще что-то связанное с формами.
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeComponent,
    RecipesComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, /* Её нужно помещать сюда, чтобы ангуляр её смог заюзать во свех компонентах относящихся к этому модулю.
    Так как app.module.ts является корневым компонентом, то дериктивы из FormsModule будут доступны во всём приложении.
    Надеюсь я правильно понял концепцию NgModules.
    */
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
Еще мысли про ngModules

Module (angular ngModules) bundle of functionalities of our app
and it basically gives Angular the information which features does my app have and use.

Тут речь об app потому что модуль корневой и относится ко всему приложению. Если речь идет не о корневом модуле,
то можно переписать фразу вот так:
Module (angular ngModules) bundle of functionalities of our (components, classes, directives etc.)
and it basically gives Angular the information which features does my current module have and use. Как-то так.

ngModule это ангуляровская штука, ангуляровская область видимости частей приложения.
Это некий смысловой фрагмент объеденяющий в себе разные части программы (компоненты, классы, сервисы и прочее).
Например в один ngModule мы можем добавлять сколько хотим компонентов и они будут принадлежать этому модулю,
т.е. ангуляр будет их расценивать как принадлежащие к данному модулю.
А import вверху файла, это обычный JavaScript импорт без которого ничего не будет работать.
А вот массив import[] в декораторе @ngModule это как раз-таки инструкция ангуляру,
что все другие ангуляровские модули (ngModules) в этом массиве относятся к данному ангуляровскому модулю,
точнее не относятся, а будут доступны внутри данного модуля.
Короче массив import[] как-бы импортирует другие ngModules в данный ngModule.
Т.е. import[] это информация ангуляру (парсеру ангуляровскому), что данный модуль импортирует (включает в себя)
все модули перечисленный в массиве import[].
Ну и собственно, если я всё верно понял, то ангуляр на этапе сборки "компиляции" проекта, всё это заимпортирует.

Но он не просто это заимпортирует куда-то в глобальную область, а заимпортирует это именно для текущего модуля, над которым
прописан декоратор @ngModule.

Т.е. в нашем примере он заимпортирует BrowserModule для класса AppModule.
Т.е. внутри класса AppModule будет доступен модуль BrowserModule
А так как AppModule является корневым модулем (root module), то BrowserModule будет доступен по всему приложению.

Надеюсь всё правильно понял.

*/
