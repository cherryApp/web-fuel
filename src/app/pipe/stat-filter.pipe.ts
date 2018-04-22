import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statFilter'
})
export class StatFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
