import { DataTypes } from 'sequelize';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

export interface IReview {
  id: number;
  name: string;
  grade: number;
  comment: string;
}

@Table({ tableName: 'reviews' })
export class ReviewsModel extends Model<ReviewsModel, IReview> {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.INTEGER })
  grade: number;

  @Column({ type: DataType.TEXT })
  comment: string;
}
