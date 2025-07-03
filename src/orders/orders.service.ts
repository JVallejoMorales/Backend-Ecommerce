import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Product } from 'src/products/entities/products..entity';
import { OrderDetail } from './entities/orderDetails.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async addOrder(userId: string, products: Partial<Product[]>) {
    const user: User | null = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!user) throw new NotFoundException('User not found');

    const order = new Order();
    order.user = user;
    order.date = new Date();

    const newOrder = await this.ordersRepository.save(order);

    let total = 0;

    const productsArray: Product[] = await Promise.all(
      products.map(async (element) => {
        const product: Product | null = await this.productsRepository.findOneBy(
          {
            id: element?.id,
          },
        );

        if (!product) throw new NotFoundException('Product not Found');

        if (product.stock <= 0)
          throw new BadRequestException(`Product ${product.name} has no stock`);

        total += Number(product.price);

        await this.productsRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetail();
    orderDetail.orders = newOrder;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { orderDetails: { products: true } },
    });

    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) throw new NotFoundException('Order not found');

    await this.ordersRepository.update(id, updateOrderDto);

    return updateOrderDto;
  }

  async deleteOrder(id: string) {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) throw new NotFoundException('Order not found');

    await this.ordersRepository.delete(id);

    return 'order removed';
  }
}
