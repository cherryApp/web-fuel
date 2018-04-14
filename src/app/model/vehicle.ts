export class Vehicle {
  lp: string;
  manufacturer: string;
  type: string;
  consumption: string;
  fuelType: string;
  year: string;

  constructor(options: {} = {}) {
    for (let k in options) {
      if(options[k] && options[k] !== false) {
        this[k] = options[k];
      } else if (options === false) {
        this[k] = false;
      } else {
        this[k] = "";
      }
    }
  }
}

export const Fuels: string[] = [
  "diesel",
  "gasoline",
  "hybrid",
  "electric"
];
