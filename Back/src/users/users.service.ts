import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Juan',
      phone: 1234567,
    },
    {
      id: 2,
      name: 'Pedro',
      phone: 89101123,
    },
  ];
  getUsers() {
    return this.users;
  }
}
