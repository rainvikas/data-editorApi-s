import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

import { Geometry } from 'geojson';
@Entity('imagedata')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'decimal', nullable: true})
  lat: any;

  @Column({ type:'decimal', nullable:true})
  long: any;

  @Column({ type:'decimal', nullable:true })
  alt: any;

  @Column({ nullable: true })
  fname: string;

  @Column({ type: 'jsonb', default: {} })
  raw_data: any;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'geometry',
    srid: 4326,
    nullable: true,
  })
  geom: Geometry;

  
}
