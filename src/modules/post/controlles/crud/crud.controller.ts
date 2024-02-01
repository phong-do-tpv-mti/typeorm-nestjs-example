import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CrudService } from '../../services/crud/crud.service';

@Controller('post/crud')
export class CrudController {
  constructor(private postCRUDService: CrudService) {}

  @Get('create')
  createUser() {
    return this.postCRUDService.create();
  }

  @Get('get')
  getUser() {
    return this.postCRUDService.findAll();
  }

  @Get('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.postCRUDService.remove(id);
  }
}
