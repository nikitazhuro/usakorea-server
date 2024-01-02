import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersModel } from './orders/orders.model';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsModel } from './reviews/reviews.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'usakorea',
      models: [UserModel, OrdersModel, ReviewsModel],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    UserModule,
    AuthModule,
    OrdersModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
