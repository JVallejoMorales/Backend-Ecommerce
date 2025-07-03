import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDTO } from './dtos/product.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  createProduct() {
    return this.productsService.createProduct();
  }

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productsService.getProducts(+page, +limit);
    }
    return this.productsService.getProducts(1, 7);
  }

  @Post()
  @UseGuards(AuthGuard)
  postProducts(@Body() product: CreateProductDTO) {
    return this.productsService.addProduct(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  putProducts(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: CreateProductDTO,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Patch(':id/stock')
  updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('action') action: 'increment' | 'decrement',
  ) {
    return this.productsService.updateStock(id, action);
  }

  @Delete(':id')
  deleteProducts(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
