import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from './user.schema';

export type EntityDocument = Entity & Document;

@Schema()
export class Entity {
  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  description: string;

  @Prop()
  editBy: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
  for: User[];
}

export const EntitySchema = SchemaFactory.createForClass(Entity).set('timestamps', true);