import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FileService } from './../file/file.service';
import { DeliveredCarsModel } from './delivered-cars.model';

@Injectable()
export class DeliveredCarsService {
  constructor(
    @InjectModel(DeliveredCarsModel)
    private deliveredCarsRepository: typeof DeliveredCarsModel,
    private readonly fileService: FileService,
  ) {}

  async create(image: any) {
    const fileName = await this.fileService.createFile(image);

    const postConfig = {
      image: fileName,
      show: false,
    };

    const post = await this.deliveredCarsRepository.create(postConfig);

    return post;
  }

  async update({ id, show }) {
    const image = await this.deliveredCarsRepository.findOne({ where: { id } });
    image.show = show;

    await image.save();
  }

  async delete(id: number) {
    const doc = await this.deliveredCarsRepository.findOne({ where: { id } });

    await this.fileService.delete(doc.image);
    await doc.destroy();
  }

  async getAll() {
    return this.deliveredCarsRepository.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async getAllFowShow() {
    return this.deliveredCarsRepository.findAll({
      where: {
        show: true,
      },
      limit: 10,
      order: [['updatedAt', 'DESC']],
    });
  }
}
