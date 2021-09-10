import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Entity, EntityDocument } from '../schemas/entity.schema';
import { EntityClass } from '../interface/iEntity';

@Injectable()
export class EntityService {
  constructor(@InjectModel(Entity.name) private entityModel: Model<EntityDocument>) {}

  getEntity(entity: EntityClass): Entity {
    const newObject = new this.entityModel();
    newObject.name = entity.name;
    newObject.quantity = entity.quantity;
    newObject.description = entity.description;
    return newObject;
  }
}
