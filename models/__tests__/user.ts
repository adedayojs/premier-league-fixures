import mongoose from 'mongoose';
import User from '../user';

const createdUser = {
  _id: new mongoose.Types.ObjectId().toHexString(),
  firstName: 'Cynthia',
  email: 'cyndi3@yahoo.com',
  role: 'ADMIN'
};

describe('User model test', () => {
  test('User has a module', () => {
    expect(User).toBeDefined();
  });

  describe('Get User Object from Model', () => {
    it('should get a user', () => {
      const user = new User(createdUser);
      expect(user.email).toBe(createdUser.email);
      expect(user.role).toBe(createdUser.role);
    });
  });
});
