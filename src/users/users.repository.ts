// import { Injectable } from '@nestjs/common';
// import { CreateUserDTO } from './dtos/user.dto';

// export interface User {
//   id: number;

//   email: string;

//   name: string;

//   password: string;

//   address: string;

//   phone: string;

//   country?: string | undefined;

//   city?: string | undefined;
// }

// @Injectable()
// export class UsersRepository {
//   private users: User[] = [
//     {
//       id: 1,

//       email: 'prueba@gmail.com',

//       name: 'Pepito',

//       password: '12345',

//       address: 'calle 71 sur',

//       phone: '1234567',

//       country: 'Colombia',

//       city: 'Medellin',
//     },

//     {
//       id: 2,

//       email: 'prueba2@gmail.com',

//       name: 'Juan',

//       password: '22222',

//       address: 'calle 81 sur',

//       phone: '454548',

//       country: 'Venezuela',

//       city: 'Caracas',
//     },

//     {
//       id: 3,

//       email: 'prueba3@gmail.com',

//       name: 'Jose',

//       password: '33333',

//       address: 'calle 48 sur',

//       phone: '548474',

//       country: 'Alemani',

//       city: 'Berlin',
//     },

//     {
//       id: 4,

//       email: 'prueba4@gmail.com',

//       name: 'Luis',

//       password: '444444',

//       address: 'calle 98 sur',

//       phone: '255202',

//       country: 'Francia',

//       city: 'Paris',
//     },

//     {
//       id: 5,

//       email: 'prueba5@gmail.com',

//       name: 'Juana',

//       password: '555555',

//       address: 'calle 14 sur',

//       phone: '5026048',

//       country: 'Espana',

//       city: 'Madrid',
//     },
//   ];

//   getUsers(): User[] {
//     return this.users;
//   }

//   getById(id: number) {
//     const user = this.users.find((user) => user.id === id);
//     if (!user) return undefined;

//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword;
//   }

//   createUser(user: CreateUserDTO) {
//     const id = this.users.length + 1;
//     this.users = [...this.users, { id, ...user }];
//     return { id };
//   }

//   updateUser(id: number, user: CreateUserDTO) {
//     const existingUser = this.users.find((user) => user.id === id);
//     if (existingUser) {
//       Object.assign(existingUser, user);
//       return { id };
//     }
//     return undefined;
//   }

//   deleteUser(id: number) {
//     this.users = this.users.filter((user) => user.id !== id);
//     return { id };

//     // const existingUser = this.users.find((user) => user.id === id);
//     // if (existingUser) {
//     //   this.users = this.users.filter((index) => index.id !== existingUser.id);
//     //   return { id };
//     // }
//     // return undefined;
//   }
// }
