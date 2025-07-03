// import { Injectable } from '@nestjs/common';
// import { CreateProductDTO } from './dtos/product.dto';

// export interface Product {
//   id: number;

//   name: string;

//   description: string;

//   price: number;

//   stock: boolean;

//   imgUrl: string;
// }

// @Injectable()
// export class ProductsRepository {
//   private products: Product[] = [
//     {
//       id: 1,

//       name: 'Moto',

//       description: 'Suzuki',

//       price: 3000000,

//       stock: true,

//       imgUrl: 'http//fdfdfdfdfd',
//     },

//     {
//       id: 2,

//       name: 'Carro',

//       description: 'Mazda',

//       price: 4000000,

//       stock: true,

//       imgUrl: 'http//aasasasas',
//     },

//     {
//       id: 3,

//       name: 'Juguete',

//       description: 'Spiderman',

//       price: 5000000,

//       stock: true,

//       imgUrl: 'http//aasasasas',
//     },

//     {
//       id: 4,

//       name: 'Sabana',

//       description: 'Comoda',

//       price: 5000000,

//       stock: true,

//       imgUrl: 'http//aasasasas',
//     },

//     {
//       id: 5,

//       name: 'Xbox',

//       description: 'One',

//       price: 6000000,

//       stock: true,

//       imgUrl: 'http//aasasasas',
//     },
//   ];

//   getProducts(): Product[] {
//     return this.products;
//   }

//   getById(id: number) {
//     return this.products.find((product) => product.id === id);
//   }

//   createProduct(product: CreateProductDTO) {
//     const id = this.products.length + 1;
//     this.products = [...this.products, { id, ...product }];
//     return { id };
//   }

//   updateProduct(id: number, product: CreateProductDTO) {
//     const existingProduct = this.products.find((product) => product.id === id);
//     if (existingProduct) {
//       Object.assign(existingProduct, product);
//       return { id };
//     }
//     return undefined;
//   }

//   deleteProduct(id: number) {
//     this.products = this.products.filter((product) => product.id !== id);
//     return { id };

//     // const existingProduct = this.products.find((product) => product.id === id);
//     // if (existingProduct) {
//     //   this.products = this.products.filter(
//     //     (index) => index.id !== existingProduct.id,
//     //   );
//     //   return { id };
//     // }
//     // return undefined;
//   }
// }
