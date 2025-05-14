import { Location } from "./location.entity";

export class Zone {
    id: number;
    name: string;
    description: string;
    locations: Location[];
    active: boolean;
    
    constructor(
        id?: number,
        name?: string,
        description?: string,
        locations: Location[] = [],
        active?: boolean
    ) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.description = description ?? '';
        this.locations = locations;
        this.active = active ?? true;
    }
}

export interface ZoneInfo {
    id: number;
    name: string;
    description: string;
    active: boolean;
}