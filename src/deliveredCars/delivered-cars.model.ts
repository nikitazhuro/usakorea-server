import { DataTypes } from 'sequelize';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

export interface IDeliveredCars {
  id: number;
  name: string;
  number: string;
}

@Table({ tableName: 'delivered-cars' })
export class DeliveredCarsModel extends Model<
  DeliveredCarsModel,
  IDeliveredCars
> {
  @Column({ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.BOOLEAN })
  show: boolean;
}
