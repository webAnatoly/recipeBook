import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-child-example',
  templateUrl: './view-child-example.component.html',
  styleUrls: ['./view-child-example.component.scss']
})
export class ViewChildExampleComponent implements OnInit {
  // Пример получения объекта формы через @ViewChild
  @ViewChild('f') signUpForm!: NgForm;
  /*
  Такой способ полезен потому что можно получать доступ к объкту формы не только во время Submit, но и раньше, если надо.
   */
  genders = ['male', 'female'];

  constructor() { }

  ngOnInit(): void {
  }

  suggestUserName(): void {
    const suggestedName = 'Superuser';
    /* Пример установки значений формы с помощью setValue(). Нужно передовать объект полностью иначе будет ошибка. */
    this.signUpForm.setValue({
      userData: {
        username: suggestedName,
        email: '',
      },
      secret: 'pet',
      gender: 'male',
    });
  }

  onSubmit(): void {
    console.log(this.signUpForm);
  }

}
