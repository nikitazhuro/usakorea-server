import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UsersReviewsModel } from './users-reviews.model';

@Injectable()
export class UsersReviewsService {
  constructor(
    @InjectModel(UsersReviewsModel)
    private usersReviewsRepository: typeof UsersReviewsModel,
  ) {}
  async createReview(config: any) {
    const params = {
      ...config,
      approved: false,
    };

    await this.usersReviewsRepository.create(params);
  }

  async updateReview({ id, approved }: { id: number; approved: boolean }) {
    const order = await this.usersReviewsRepository.findOne({ where: { id } });

    order.approved = approved;

    await order.save();
  }

  async getLastFive() {
    return this.usersReviewsRepository.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
    });
  }

  async getAll() {
    return this.usersReviewsRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async deleteReview(id: number) {
    await this.usersReviewsRepository.destroy({ where: { id } });
  }
}
