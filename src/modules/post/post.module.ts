import { Module } from '@nestjs/common';
import { CrudController } from './crud/crud.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  controllers: [CrudController],
  providers: [CrudService],
})
export class PostModule {}
