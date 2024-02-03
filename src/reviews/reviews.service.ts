import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ReviewsModel } from './reviews.model';
import { sendErrorToSentry } from 'src/utils';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewsModel) private reviewsRepository: typeof ReviewsModel,
  ) {}
  async createReview(config: any) {
    try {
      if (Object.keys(config).length === 4) {
        await this.reviewsRepository.create(config);
      }
    } catch (error) {
      console.log(error);
      sendErrorToSentry('create review', error.message);
    }
  }
  async updateReview({
    id,
    comment,
    name,
    date,
    grade,
  }: {
    id: number;
    name: string;
    grade: number;
    date: Date;
    comment: string;
  }) {
    try {
      const order = await this.reviewsRepository.findOne({ where: { id } });

      if (comment != undefined) {
        order.comment = comment;
      }

      if (grade != undefined) {
        order.grade = +grade;
      }

      if (date != undefined) {
        order.date = date;
      }

      if (name != undefined) {
        order.name = name;
      }

      await order.save();
    } catch (error) {
      console.log(error);
      sendErrorToSentry('update review', error.message);
    }
  }

  async getLastFive() {
    try {
      return this.reviewsRepository.findAll({
        limit: 10,
        order: [['date', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('get last 5 reviews, PROD LEND', error.message);
    }
  }

  async getAll() {
    try {
      return this.reviewsRepository.findAll({
        order: [['date', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('get all reviews', error.message);
    }
  }

  async deleteReview(id: number) {
    try {
      await this.reviewsRepository.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('delete review', error.message);
    }
  }
}
