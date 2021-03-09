import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

}
