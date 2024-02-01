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

  @Get('create-post-tag/:tagName')
  async createPostWithTag(@Param('tagName') tagName: string) {
    return await this.postCRUDService.createPostWithTag(tagName);
  }

  @Get('delete-post-tag/:tagName')
  async deletePostByTag(@Param('tagName') tagName: string) {
    return await this.postCRUDService.deletePostByTag(tagName);
  }

  @Get('create-multi-tags')
  async createMultipleTag() {
    return await this.postCRUDService.createMultipleTag();
  }
}
