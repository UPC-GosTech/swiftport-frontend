import { Coordinate } from "./coordinate.entity";

export class Location {
    id: number;
    zoneId: number;
    name: string;
    description: string;
    ubication: Coordinate;

    constructor(
        id: number,
        zoneId: number,
        name: string,
        description: string,
        ubication: Coordinate
    ) {
        this.id = id;
        this.zoneId = zoneId;
        this.name = name;
        this.description = description;
        this.ubication = ubication;
    }

}
