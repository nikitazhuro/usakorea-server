import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import * as dayjs from 'dayjs';

import { OrdersModel } from './orders.model';

const secret = '6918841607:AAGCWW_MGrx3K_NTN5J3WxrxpYIt3g9rhBg';
const chatsIds = [1715992777, 323934151, 298938846, 1331115368];

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrdersModel) private ordersRepository: typeof OrdersModel,
  ) {}
  async createOrder({
    name,
    number,
    userComment,
    budget,
  }: {
    name: string;
    number: string;
    userComment: string;
    budget: string;
  }) {
    try {
      const config = {
        name,
        number,
        comment: '',
        userComment: userComment || '',
        budget: budget || '',
        complete: false,
      };

      const existOrder = await this.ordersRepository.findOne({
        where: { number },
      });

      if (!existOrder) {
        await this.ordersRepository.create(config);
        this.sendMessageToAll({ name, number, userComment, budget });
      }
    } catch (error) {
      console.log(error);
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

  async sendMessageToAll({ name, number, userComment, budget }) {
    try {
      const fields = [`<b>Имя</b>: ${name}`, `<b>Номер</b>: ${number}`];

      if (budget) {
        fields.push(`<b>Бюджет</b>: ${budget}`);
      }

      if (userComment) {
        fields.push(`<b>Комментарий</b>: ${userComment}`);
      }

      const date = dayjs().format('DD.MM.YY, HH:mm');

      fields.push(`<b>Заявка от:</b> ${date}`);

      let msg = '';
      fields.forEach((field) => {
        msg += field + '\n';
      });

      console.log(msg, 'msg');

      msg = encodeURI(msg);

      for (let i = 0; i < chatsIds.length; i++) {
        const id = chatsIds[i];
        await axios.post(
          `https://api.telegram.org/bot${secret}/sendMessage?chat_id=${id}&parse_mode=html&text=${msg}`,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return this.ordersRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
}
