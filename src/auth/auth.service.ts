import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from 'src/users/dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // getAuth(): Auth[] {
  //   return this.authRepository.getAuth();
  // }

  // getAuthLogin(authLogin: Omit<Auth, 'id'>) {
  //   return this.authRepository.getAuthLogin(authLogin);
  // }

  // createAuthSignin(authSignin: Omit<Auth, 'id'>) {
  //   return this.authRepository.createAuthSignin(authSignin);
  // }

  async signIn(credentials: LoginDTO) {
    const findUser: User | null = await this.usersRepository.findOneBy({
      email: credentials.email,
    });

    if (!findUser) throw new BadRequestException('Bad Credentials');

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      findUser.password,
    );

    if (!passwordMatch) throw new BadRequestException('Bad Credentials');

    const payload = {
      id: findUser.id,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async createUser(user: CreateUserDTO) {
    const findUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (findUser) throw new BadRequestException('Usuario ya registrado');

    const confirmPassword = user.confirmPassword === user.password;

    if (!confirmPassword) {
      throw new BadRequestException('Las contrasenas deben ser iguales');
    } else {
      const hasedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await this.usersRepository.save({
        ...user,
        password: hasedPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, ...userWithoutPassword } = newUser;

      return userWithoutPassword;
    }
  }
}
