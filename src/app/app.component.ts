import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  suggestUserName(): void {
    const suggestedName = 'Superuser';
  }

  onSubmit(form: NgForm): void {
    // form это объект типа NgForm, представляющий форму и её поля.
    // Этот объект создается ангуляром на основе верстки формы в шаблоне.
    // И этот объект мы передали сюда из шаблона вот таким образом <form (ngSubmit)="onSubmit(currentForm)" #currentForm="ngForm">
    console.log('Submitted!', form);
  }
}
