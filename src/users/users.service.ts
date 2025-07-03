import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<Partial<User>[]> {
    let users = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);

    return usersWithoutPasswords;
  }

  async getUsersById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  // async createUser(user: CreateUserDTO) {
  //   const findUser = await this.usersRepository.findOneBy({
  //     email: user.email,
  //   });

  //   if (findUser) throw new BadRequestException('Usuario ya registrado');

  //   const newUser = this.usersRepository.create(user);

  //   return this.usersRepository.save(newUser);
  // }

  async updateUser(id: string, user: CreateUserDTO) {
    const findUser = await this.usersRepository.findOneBy({ id: id });

    if (!findUser) throw new NotFoundException('User not found');

    await this.usersRepository.update(id, user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    const findUser = await this.usersRepository.findOneBy({ id: id });

    if (!findUser) throw new NotFoundException('User not found');

    await this.usersRepository.delete(id);

    return { id };
  }
}
