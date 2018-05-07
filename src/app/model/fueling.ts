/**
 * A Fuelink entitás modellje.
 */
export class Fueling {
  vehicleId: string;
  driverId: string;
  vehicleLp: string;
  time: Date;
  amount: number;

  /**
   *
   * @param options az új objektum alapértelmezett értékei.
   */
  constructor(options: any = {}) {
    this.vehicleId = options.vehicleId || "";
    this.driverId = options.driverId || "";
    this.vehicleLp = options.vehicleLp || "";
    this.time = options.time || "";
    this.amount = options.amount || "";
  }
}
