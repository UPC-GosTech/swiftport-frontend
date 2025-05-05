export class Planification {
  id?: number;
  requirementId?: number;
  description?: string;
  status?: 'NEW' | 'PLANNED' | 'EXECUTED' | 'CANCELLED';
  createdAt?: Date;
  updatedAt?: Date;

  priorityRuleIds?: number[];
  executionIds?: number[];
  cargoIds?: number[];

  constructor() {
    this.id = 0;
    this.requirementId = 0;
    this.description = '';
    this.status = 'NEW';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.priorityRuleIds = [];
    this.executionIds = [];
    this.cargoIds = [];
    }
}
