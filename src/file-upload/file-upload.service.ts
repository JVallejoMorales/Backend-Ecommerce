import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products..entity';
import { Repository } from 'typeorm';
import { FileUploadRepository } from './file-upload.repository';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) throw new NotFoundException('Product not found');

    const uploadResponse = await this.fileUploadRepository.uploadImage(file);

    await this.productsRepository.update(product.id, {
      imgUrl: uploadResponse.url,
    });

    return await this.productsRepository.findOneBy({
      id: productId,
    });
  }

  async uploadPerfilImage(file: Express.Multer.File, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');

    const uploadResponse = await this.fileUploadRepository.uploadImage(file);

    await this.usersRepository.update(user.id, {
      imgUrl: uploadResponse.url,
    });

    const newUser = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!newUser) throw new NotFoundException('User not found after update');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }
}
