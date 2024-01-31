import { Controller, Get } from '@nestjs/common';
import { CrudService } from '../../services/crud/crud.service';

@Controller('user/crud')
export class CrudController {
  constructor(private userCRUDService: CrudService) {}

  @Get('create')
  createuser() {
    return this.userCRUDService.create();
  }
}
