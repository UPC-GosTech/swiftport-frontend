export class Equipment {
    id: number;
    plateNumber: string;
    type: string;
    capacityLoad: number;
    capacityPassengers: number;
    status: string;

    constructor() {
        this.id = 0;
        this.plateNumber = '';
        this.type = '';
        this.capacityLoad = 0;
        this.capacityPassengers = 0;
        this.status = '';
    }
}

