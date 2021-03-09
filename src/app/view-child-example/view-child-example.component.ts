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

  submitted = false;

  user = {
    name: '',
    email: '',
    question: '',
    gender: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

  suggestUserName(): void {
    const suggestedName = 'Superuser';
    /* Пример установки значений формы с помощью setValue(). Нужно передовать объект полностью иначе будет ошибка. */
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   gender: 'male',
    // });

    /* Пример с patchValue()
       в отличии от setValue() form.patchValue() позволяет обновить целевой инпут не затрагивая другие инпуты */
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }

  onSubmit(): void {
    console.log(this.signUpForm);
    this.user.name = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.question = this.signUpForm.value.secret;
    this.user.gender = this.signUpForm.value.gender;
    this.submitted = true;

    this.signUpForm.reset(); // очистить форму
    // If you want, you can pass the same object as in setValue() to reset() which will then reset the form to specific values!
  }

}
