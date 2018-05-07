import { Pipe, PipeTransform } from '@angular/core';

/**
 * A statisztikai adatok szűrésére szolgáló Pipe.
 */
@Pipe({
  name: 'statFilter'
})
export class StatFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value;
  }

}
