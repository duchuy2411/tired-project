import { Controller, Get } from '@nestjs/common';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private entityService: EntityService) {}

  @Get()
  getEntity(): string {
    return '123';
  }
}
