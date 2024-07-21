const User = require('../models/user');

describe('User model', () => {
  it('should validate required fields', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it('should create a valid user', () => {
    const user = new User({ name: 'John Doe', email: 'john.doe@example.com' });
    expect(user.validateSync()).toBeUndefined();
  });
});