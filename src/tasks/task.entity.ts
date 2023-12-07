import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './task-statu.enum';

@Entity('Task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
