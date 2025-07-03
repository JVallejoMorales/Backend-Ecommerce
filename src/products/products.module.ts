import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from './entities/products..entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
