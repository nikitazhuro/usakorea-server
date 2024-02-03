import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FileService } from './../file/file.service';
import { DeliveredCarsModel } from './delivered-cars.model';
import { sendErrorToSentry } from 'src/utils';

@Injectable()
export class DeliveredCarsService {
  constructor(
    @InjectModel(DeliveredCarsModel)
    private deliveredCarsRepository: typeof DeliveredCarsModel,
    private readonly fileService: FileService,
  ) {}

  async create(image: any) {
    try {
      const fileName = await this.fileService.createFile(image);

      const postConfig = {
        image: fileName,
        show: false,
      };

      const post = await this.deliveredCarsRepository.create(postConfig);

      return post;
    } catch (error) {
      console.log(error);
      sendErrorToSentry('create delivered car', error.message);
    }
  }

  async update({ id, show }) {
    try {
      const image = await this.deliveredCarsRepository.findOne({
        where: { id },
      });
      image.show = show;

      await image.save();
    } catch (error) {
      console.log(error);
      sendErrorToSentry('update delivered car', error.message);
    }
  }

  async delete(id: number) {
    try {
      const doc = await this.deliveredCarsRepository.findOne({ where: { id } });

      await this.fileService.delete(doc.image);
      await doc.destroy();
    } catch (error) {
      console.log(error);
      sendErrorToSentry('delete delivered car', error.message);
    }
  }

  async getAll() {
    try {
      return this.deliveredCarsRepository.findAll({
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      sendErrorToSentry('get all delivered cars', error.message);
    }
  }

  async getAllFowShow() {
    try {
      return this.deliveredCarsRepository.findAll({
        where: {
          show: true,
        },
        limit: 10,
        order: [['updatedAt', 'DESC']],
      });
    } catch (error) {
      console.log(error);
      sendErrorToSentry(
        'get all delivered cars for show, PROD LEND',
        error.message,
      );
    }
  }
}
