import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UsersReviewsModel } from './users-reviews.model';
import { sendErrorToSentry } from 'src/utils';

@Injectable()
export class UsersReviewsService {
  constructor(
    @InjectModel(UsersReviewsModel)
    private usersReviewsRepository: typeof UsersReviewsModel,
  ) {}
  async createReview(config: any) {
    try {
      const params = {
        ...config,
        approved: false,
      };

      await this.usersReviewsRepository.create(params);
    } catch (error) {
      console.log(error);
      sendErrorToSentry('create user review, PROD LEND', error.message);
    }
  }

  async updateReview({ id, approved }: { id: number; approved: boolean }) {
    try {
      const order = await this.usersReviewsRepository.findOne({
        where: { id },
      });

      order.approved = approved;

      await order.save();
    } catch (error) {
      console.log(error);
      sendErrorToSentry('update user review', error.message);
    }
  }

  async getLastFive() {
    try {
      return this.usersReviewsRepository.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('get last 5 user reviews', error.message);
    }
  }

  async getAll() {
    try {
      return this.usersReviewsRepository.findAll({
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('get all user reviews', error.message);
    }
  }

  async deleteReview(id: number) {
    try {
      await this.usersReviewsRepository.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('delete user review', error.message);
    }
  }
}
