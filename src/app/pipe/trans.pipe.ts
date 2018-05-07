import { Pipe, PipeTransform } from '@angular/core';

/**
 * A fordításokért felelős Pipe.
 */
@Pipe({
  name: 'trans'
})
export class TransPipe implements PipeTransform {

  /**
   * Magyar fordítások.
   */
  hun: Array<{key: string, value: string}> = [
    {key: "lp", value: "rendszám"},
    {key: "manufacturer", value: "gyártó"},
    {key: "type", value: "típus"},
    {key: "consumption", value: "fogyasztás"},
    {key: "fuelType", value: "üzemanyag"},
    {key: "year", value: "gyártva"}
  ];

  /**
   * A konkrét nyers érték fordítását adja vissza.
   * Ha nem talál megfelelő kulcsot, az eredeti értéket adja vissza.
   * @param value a nyers érték.
   * @param args egyéb argumentumok.
   */
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
