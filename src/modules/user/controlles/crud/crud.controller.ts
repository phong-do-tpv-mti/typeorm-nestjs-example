import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CrudService } from '../../services/crud/crud.service';

@Controller('user/crud')
export class CrudController {
  constructor(private userCRUDService: CrudService) {}

  @Get('create')
  createUser() {
    return this.userCRUDService.create();
  }

  @Get('get')
  getUser() {
    return this.userCRUDService.findAll();
  }

  @Get('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userCRUDService.remove(id);
  }
}
