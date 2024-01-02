import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersModel } from './orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrdersModel) private ordersRepository: typeof OrdersModel,
  ) {}
  async createOrder({ name, number }: { name: string; number: string }) {
    const config = {
      name,
      number,
      comment: '',
      complete: false,
    };

    const existOrder = await this.ordersRepository.findOne({
      where: { number },
    });

    if (!existOrder) {
      await this.ordersRepository.create(config);
    }
  }
  async updateOrder({
    id,
    comment,
    complete,
  }: {
    id: number;
    comment: string;
    complete: boolean;
  }) {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (comment != undefined) {
      order.comment = comment;
    }

    if (complete != undefined) {
      order.complete = complete;
    }

    await order.save();
  }

  async getAll() {
    return this.ordersRepository.findAll();
  }
}
