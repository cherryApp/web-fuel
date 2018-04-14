import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans'
})
export class TransPipe implements PipeTransform {

  hun: Array<{key: string, value: string}> = [
    {key: "lp", value: "rendszám"},
    {key: "manufacturer", value: "gyártó"},
    {key: "type", value: "típus"},
    {key: "consumption", value: "fogyasztás"},
    {key: "fuelType", value: "üzemanyag"},
    {key: "year", value: "gyártva"}
  ];

  transform(value: any, args?: any): any {
    let translated = "";
    this.hun.forEach( item => {
      if (item.key == value) {
        translated = item.value;
      }
    });
    return translated;
  }

}
