import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // by default true that means transform() method is invoked only when its input arguments changed
  /*to read more about "pure" parameter Ctrl+Click on "pure" if you use Storm IDE*/
  /* С этим режимом нужно быть аккуратнее, потому что в режиме pure:false pipe будет перезапускаться всякий раз,
  когда на странице что-то меняется и это может сказаться на производительности приложения */
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
