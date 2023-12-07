import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '24462@Peter',
  database: 'taskmanagement',
  entities: [TaskEntity],
  synchronize: true,
};
