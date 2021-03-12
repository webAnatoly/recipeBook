import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform{
  // transform(value: any, ...args): any {
  //   return value;
  // }
  transform(value: any): any {
    return value.substr(0, 10);
  }
}
