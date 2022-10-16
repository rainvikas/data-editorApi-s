import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly User: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return from(this.User.save(createUserDto));
  }

  async find(BBox) {
    let data: any = await this.User
      .query(`SELECT *FROM "imageData" WHERE ST_Contains(
          ST_Transform(
              ST_MakeEnvelope(${BBox},4326)  
              ,4326)
          ,"imageData".geom::geometry)`);

    // console.log(sample);

    return { data };
  }
}
