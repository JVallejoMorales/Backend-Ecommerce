import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async addCategories() {
    const categoriesNames = new Set(data.map((element) => element.category));
    const categoriesArray = Array.from(categoriesNames);
    const categories = categoriesArray.map((category) => ({ name: category }));

    await this.categoriesRepository.upsert(categories, ['name']);

    return 'This action adds a new category';
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }
}
