import { ArrayNotEmpty, IsArray, IsEmpty, IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/products..entity';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsEmpty()
  status: string;

  @IsArray()
  @ArrayNotEmpty()
  products: Partial<Product[]>;
}

// export class CreateOrderDto {
//   userId: string;
//   products: { id: string }[];
// }

// type Product = {
//   id: string;
// };
