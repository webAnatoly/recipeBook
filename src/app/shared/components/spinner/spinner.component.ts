import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @HostBinding('style.--color')// css переменная используется в css псевдоклассе, поэтому к ней привязываемся через @HostBinding
  @Input() spinnerColor = '#007bff';
  @Input() spinnerScale = 1;
  computedStyles = {};


  constructor() { }

  ngOnInit(): void {
    this.computedStyles = {transform: `scale(${this.spinnerScale})`};
  }

}
