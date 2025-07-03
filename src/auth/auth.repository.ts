import { Injectable } from '@nestjs/common';

export interface Auth {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class AuthRepository {
  private auth: Auth[] = [
    {
      id: 1,

      username: 'Pepito123',

      password: '12345',
    },

    {
      id: 2,

      username: 'Manolo123',

      password: '1234578',
    },
  ];

  getAuth(): Auth[] {
    return this.auth;
  }

  getAuthLogin(authLogin: Omit<Auth, 'id'>) {
    const credentials = this.auth.find(
      (credentials) => credentials.username === authLogin.username,
    );
    const credentialPassword = this.auth.find(
      (credentials) => credentials.password === authLogin.password,
    );

    if (!authLogin.username || !authLogin.password)
      throw new Error('Falta usuario o contrasena');

    if (!credentials) throw new Error('Email o password incorrectos');

    if (!credentialPassword) throw new Error('Email o password incorrectos');
  }

  createAuthSignin(authSignin: Omit<Auth, 'id'>) {
    const id = this.auth.length + 1;
    this.auth = [...this.auth, { id, ...authSignin }];
    return 'Registrado correctamente';
  }
}
