import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a user with default values', () => {
    const user = new User();

    expect(user.userId).toBe(0);
    expect(user.email).toBe('');
    expect(user.password).toBe('');
    expect(user.fullName).toBe('');
    expect(user.role).toBe('OPERATOR');
    expect(user.status).toBe('ACTIVE');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
