export class Vehicle {
  vehicle_id: number;
  account_id: number;
  plate_number: string;
  type: string;
  capacity_load_tons: number;
  capacity_passengers: number;
  status: string;
  created_at: string;
  updated_at: string;

  constructor() {
    this.vehicle_id = 0;
    this.account_id = 0;
    this.plate_number = '';
    this.type = '';
    this.capacity_load_tons = 0;
    this.capacity_passengers = 0;
    this.status = ''
    this.created_at = '';
    this.updated_at = '';
  }


}
