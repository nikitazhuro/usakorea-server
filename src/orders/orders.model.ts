import { DataTypes } from 'sequelize';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

export interface IOrder {
  id: number;
  name: string;
  number: string;
  comment?: string;
  budget?: string;
}

@Table({ tableName: 'orders' })
export class OrdersModel extends Model<OrdersModel, IOrder> {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  number: string;

  @Column({ type: DataType.STRING })
  comment: string;

  @Column({ type: DataType.STRING })
  userComment: string;

  @Column({ type: DataType.STRING })
  budget: string;

  @Column({ type: DataType.BOOLEAN })
  complete: boolean;
}
