import { Table, Column, DataType, Model } from 'sequelize-typescript';

export interface IUser {
  uuid: string;
  login: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, IUser> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING, unique: true })
  login: string;

  @Column({ type: DataType.STRING })
  password: string;
}
