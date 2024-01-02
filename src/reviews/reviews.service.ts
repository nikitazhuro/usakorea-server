import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ReviewsModel } from './reviews.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewsModel) private reviewsRepository: typeof ReviewsModel,
  ) {}
  async createReview(config: any) {
    if (Object.keys(config).length === 4) {
      await this.reviewsRepository.create(config);
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
  }

  async getLastFive() {
    return this.reviewsRepository.findAll({ limit: 5 });
  }

  async getAll() {
    return this.reviewsRepository.findAll();
  }

  async deleteReview(id: number) {
    await this.reviewsRepository.destroy({ where: { id } });
  }
}
