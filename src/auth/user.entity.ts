import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
