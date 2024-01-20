import { DataTypes } from 'sequelize';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

export interface IReview {
  id: number;
  name: string;
  grade: number;
  comment: string;
}

@Table({ tableName: 'users-reviews' })
export class UsersReviewsModel extends Model<UsersReviewsModel, IReview> {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.INTEGER })
  grade: number;

  @Column({ type: DataType.BOOLEAN })
  approved: boolean;

  @Column({ type: DataType.TEXT })
  comment: string;
}
