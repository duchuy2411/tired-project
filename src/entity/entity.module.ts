import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EntityController } from './entity.controller';
import { EntityService } from './entity.service';
import { Entity, EntitySchema } from '../schemas/entity.schema';
import { User, UserSchema } from '../schemas/user.schema';

import { UserMiddleware } from '../middleware/user.middleware';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Entity.name, schema: EntitySchema },
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [EntityController],
  providers: [EntityService],
})

export class EntityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('entity');
  }
};