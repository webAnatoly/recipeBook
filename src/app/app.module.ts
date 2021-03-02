import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BasicHighlightDirective } from './my-directives/basic-highlight.directive';
import { BetterHighlightDirective } from './my-directives/better-highlight.directive';
import { AnotherHighlightDirective } from './my-directives/another-highlight.directive';
import { UnlessDirective } from './my-directives/unless.directive';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';

/*
FormsModule позволяет использовать директиву [(ngModel)] в шаблоне, ну и видимо еще что-то связанное с формами.
*/

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    AnotherHighlightDirective,
    UnlessDirective,
    AccountComponent,
    NewAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, /* Её нужно помещать сюда, чтобы ангуляр её смог заюзать во свех компонентах относящихся к этому модулю.
    Так как app.module.ts является корневым компонентом, то дериктивы из FormsModule будут доступны во всём приложении.
    Надеюсь я правильно понял концепцию NgModules.
    */
  ],
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
