export class Driver {
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  address: string;
  age: number;

  constructor(options: any = {}) {
    this.name = options.name || "";
    this.email = options.email || "";
    this.phone = options.phone || "";
    this.birthDate = options.birthDate || "";
    this.address = options.address || "";
    this.age = options.age || "";
  }
}
