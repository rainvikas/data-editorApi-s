import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly User: Repository<User>,
  ) {}


  async create(users) {
    //console.log(createLocationDto);

    return from(this.User.save(users));
  }
  
  async find(BBox) {
    let data1: any = await this.User
      .query(`SELECT * FROM imageData WHERE ST_Contains(
          ST_Transform(
              ST_MakeEnvelope(${BBox},4326)  
              ,4326)
          ,imageData.geom::geometry)`);
    let data = await data1.map((ele) => {
      return {
        id: ele.id,
        lat: ele.lat,
        long: ele.long,
      };
    });
    return { NoOfData: data.length , data };
  }
}
