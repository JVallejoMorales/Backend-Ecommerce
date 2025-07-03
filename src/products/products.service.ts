import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products..entity';
import { Category } from 'src/categories/entities/category.entity';
import * as data from '../data.json';
import { CreateProductDTO } from './dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createProduct(): Promise<string> {
    const categories: Category[] = await this.categoriesRepository.find();

    const products: Product[] = data.map((element) => {
      const category: Category | undefined = categories.find(
        (category) => element.category === category.name,
      );
      const newProduct = new Product();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.imgUrl = element?.imgUrl;
      newProduct.stock = element.stock;
      newProduct.category = category!;

      return newProduct;
    });

    await this.productsRepository.upsert(products, ['name']);

    return 'Products Added';
  }

  async getProducts(page: number, limit: number): Promise<Partial<Product>[]> {
    let products = await this.productsRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    products = products.slice(start, end);

    return products;
  }

  async updateProduct(id: string, product: CreateProductDTO) {
    const findProduct = await this.productsRepository.findOneBy({
      id: id,
    });

    if (!findProduct) throw new NotFoundException('Product not found');

    await this.productsRepository.update(id, product);

    return product;
  }

  async updateStock(id: string, action: 'increment' | 'decrement') {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (action === 'increment') {
      product.stock += 1;
    } else if (action === 'decrement') {
      if (product.stock === 0) {
        throw new BadRequestException('Stock cannot be less than zero');
      }
      product.stock -= 1;
    } else {
      throw new BadRequestException('Invalid action');
    }

    await this.productsRepository.save(product);

    return product;
  }

  async addProduct(product: CreateProductDTO) {
    await this.productsRepository.save({ ...product });

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productsRepository.delete(id);

    return 'product removed';
  }
}
