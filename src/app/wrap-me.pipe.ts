import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapMe'
})
export class WrapMePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (args.length > 0) {
      return `${args[0]} ${value} ${args[0]}`;
    }
    return `[ ${value} ]`;
  }

}
