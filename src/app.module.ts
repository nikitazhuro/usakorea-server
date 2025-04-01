import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';

import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersModel } from './orders/orders.model';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewsModel } from './reviews/reviews.model';
import { FileModule } from './file/file.module';
import { DeliveredCarsModel } from './deliveredCars/delivered-cars.model';
import { DeliveredCarsModule } from './deliveredCars/delivered-cars.module';
import { BotUpdate } from './bot/bot.update';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'autosaya',
      password: 'root',
      database: 'usakorea',
      models: [UserModel, OrdersModel, ReviewsModel, DeliveredCarsModel],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    TelegrafModule.forRoot({
      token: '6918841607:AAGCWW_MGrx3K_NTN5J3WxrxpYIt3g9rhBg',
    }),
    UserModule,
    AuthModule,
    OrdersModule,
    ReviewsModule,
    FileModule,
    DeliveredCarsModule,
  ],
  controllers: [],
  providers: [BotUpdate],
})
export class AppModule {}
