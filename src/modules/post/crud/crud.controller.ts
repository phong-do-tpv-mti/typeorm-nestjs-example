import { Controller, Get } from '@nestjs/common';

@Controller('post/crud')
export class CrudController {
  @Get('/get-all')
  getPost() {
    return [
      {
        message: 'Hello',
      },
    ];
  }
}
