import { Squad } from './squad.entity';

describe('Squad Entity', () => {
  it('should create a squad with default values', () => {
    const squad = new Squad();

    expect(squad.squadId).toBe(0);
    expect(squad.name).toBe('');
    expect(squad.zone).toBe('');
    expect(squad.leaderId).toBe(0);
    expect(squad.members).toEqual([]);
    expect(squad.createdAt).toBeInstanceOf(Date);
    expect(squad.updatedAt).toBeInstanceOf(Date);
  });
});
