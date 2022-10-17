import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('allData')
  async findAll(@Query() query: { bbox: any }): Promise<any> {
    let BBox = `${query.bbox}`;
    return this.usersService.find(BBox);
  }
}
