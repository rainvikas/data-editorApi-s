import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('file')
  @UseInterceptors()
  // FileInterceptor('file_asset', {
  //   storage: diskStorage({
  //     destination: './files',
  //   })
  // })
  async uploadFile() {
    const csvFile = readFileSync('files/sample.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results: { data: any }) => results.data,
    });
    //console.log(parsedCsv.data)

    var newData = {};
    for (let a of parsedCsv.data) {
      console.log(a, 'data');
      var point = { type: 'Point', coordinates: [a.long, a.lat] };
      newData = {
        lat: a.lat,
        long: a.long,
        alt: a.alt,
        fname: a.fname,
        geom: point,
        timestamp: a.timestamp,
      };
      console.log(newData);
      console.log(this.usersService.create(newData));
    }
  //   //return this.locationService.create(newData)
  //   //console.log(parsedCsv)
   }

  @Get('allData')
  async findAll(@Query() query: { bbox: any }): Promise<any> {
    let BBox = `${query.bbox}`;
    let arr = query.bbox.split(',');
    if (arr.length === 4) {
      return this.usersService.find(BBox);
    } else {
      return {
        message: 'No Data Found',
        data: [],
      };
    }
  }
}
