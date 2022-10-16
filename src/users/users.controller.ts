import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('allData')
  async findAll(@Query() query: { bbox: any }): Promise<any> {
    let BBox = `${query.bbox}`;
    //console.log(BBox);
    return this.usersService.find(BBox);
  }
}
