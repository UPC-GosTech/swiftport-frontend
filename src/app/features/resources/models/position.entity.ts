export class Position {
    id: number;
    name: string;
    description: string;

    constructor(id?: number, name?: string, description?: string) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.description = description ?? '';
    }
    
}
