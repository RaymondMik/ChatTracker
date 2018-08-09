const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Ramon',
      room: 'Ljubljana'
    }, {
      id: '2',
      name: 'Andrea',
      room: 'Ljubljana'
    }, {
      id: '3',
      name: 'Federico',
      room: 'Grado'
    }];
  });

  test('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Raymond',
      room: 'Ljubljana'
    };
    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  test('should remove a user', () => {
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  test('should not remove user', () => {
    const userId = '99';
    const user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  test('should find user', () => {
    const userId = '2';
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  test('should not find user', () => {
    const userId = '99';
    const user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  test('should return names for Grado room', () => {
    const userList = users.getUserList('Grado');

    expect(userList).toEqual(['Federico']);
  });

  test('should return names for Ljubljana room', () => {
    const userList = users.getUserList('Ljubljana');

    expect(userList).toEqual(['Ramon', 'Andrea']);
  });
});
