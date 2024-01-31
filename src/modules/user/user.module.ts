import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CrudController } from './controlles/crud/crud.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CrudController],
  providers: [CrudService],
})
export class UserModule {}
