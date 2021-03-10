import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  myReactiveSignUpForm!: FormGroup; // in Angular, a form in the end is just a group of controls and this is what a form group holds.
  // Therefore, the overall form also is just a form group.
  /* myReactiveSignUpForm!: FormGroup; - this gives us a property which we can work and which will hold our form in the end. */

  /* For the reactive approach to work, especially later when we connect our programmatically created form to our HTML code,
  you need to import ReactiveFormsModule in app.module.ts So the ReactiveFormsModule containing all the tools we need
  to build our form on our own and then connect it to our HTML code. */

  forbiddenUserNames = ['Chris', 'Anna'];

  constructor() { }

  ngOnInit(): void {
    // You should initialize form before rendering the template
    // this.myReactiveSignUpForm = new FormGroup({}); // this is our first created form.
    // This JS object configures it an as it's empty, it simply says or tells Angular, hey this form doesn't have any controls.

    /* Controls are basically just key-value pairs in this config object we pass to the overall FormGroup. */
    this.myReactiveSignUpForm = new FormGroup({
      userData: new FormGroup({ // nested form example
        username: new FormControl(null, [Validators.required, this.forbiddenNamesValidator(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.asyncForbiddenEmailsValidator()),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // Можно подписывать на изменения статуса формы
    this.myReactiveSignUpForm.statusChanges.subscribe((status) => {
      console.log('Status of the Form: ', status);
    });

    // Можно подписываться на изменения значений формы.
    // this.myReactiveSignUpForm.valueChanges.subscribe((form) => {
    //   console.log('Value of the Form is changed: ', form);
    // });

    const initialValues = {
      userData: {
        username: 'Default User Name',
        email: 'test@test.ru',
      },
      gender: 'male',
      hobbies: [],
    };

    // Пример установки значений формы через метод setValue()
    this.myReactiveSignUpForm.setValue(initialValues);
  }

  get username(): AbstractControl | null { return this.myReactiveSignUpForm.get(['userData', 'username']); } // можно в виде массива
  get email(): AbstractControl | null { return this.myReactiveSignUpForm.get('userData.email'); } // можно в виде строки, через точку
  get hobbies(): FormArray { return this.myReactiveSignUpForm.get('hobbies') as FormArray; }
  get isForbiddenName(): boolean {
    const control: AbstractControl | null = this.myReactiveSignUpForm.get('userData.username');
    return control && control.errors && control.errors.nameIsForbidden;
  }
  get isForbiddenEmail(): boolean {
    const control: AbstractControl | null = this.myReactiveSignUpForm.get('userData.email');
    return control && control.errors && control.errors.emailIsForbidden;
  }

  onSubmit(): void {
    console.log(this.myReactiveSignUpForm);
    console.log('this.myReactiveSignUpForm.valid: ', this.myReactiveSignUpForm.valid);
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }

  forbiddenNamesValidator(self: ReactiveFormComponent): (control: AbstractControl) => ({ [key: string]: boolean} | null) {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      const forbidden = self.forbiddenUserNames.indexOf(control.value) !== -1;
      return forbidden ? { nameIsForbidden: true } : null; // if validation is successful, you have to pass nothing or null
    };
  }

  asyncForbiddenEmailsValidator(): (control: AbstractControl) => (Promise<any> | Observable<any>) {
    return (control: AbstractControl): Promise<any> | Observable<any> => {
      return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.ru') {
            resolve({emailIsForbidden: true});
          } else {
            resolve(null);
          }
        }, 1500);
      });
    };
  }
}
