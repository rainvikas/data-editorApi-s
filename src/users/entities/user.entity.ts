import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

import { Geometry } from 'geojson';
@Entity('imageData')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  altitude: string;

  @Column({ nullable: true })
  filename: string;

  @Column({ type: 'jsonb', default: {} })
  raw_data: any;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'geometry',
    srid: 4326,
    nullable: true,
  })
  geom: Geometry;

  // @Column({ nullable: true })
  // created_date:
}
