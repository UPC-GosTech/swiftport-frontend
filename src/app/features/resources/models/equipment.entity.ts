export class Equipment {
    id: number;
    plateNumber: string;
    type: string;
    capacityLoad: number;
    capacityPassengers: number;
    status: string;

    constructor(equipment: {id?: number, plateNumber?: string, type?: string, capacityLoad?: number, capacityPassengers?: number, status?: string}) {
        this.id = equipment.id || 0;
        this.plateNumber = equipment.plateNumber || '';
        this.type = equipment.type || '';
        this.capacityLoad = equipment.capacityLoad || 0;
        this.capacityPassengers = equipment.capacityPassengers || 0;
        this.status = equipment.status || '';
    }
}

