import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreatTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { CreatTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-statu.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: '%$(search)%' },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.taskRepository.delete({ id });
  }

  async createTask(createTaskDto: CreatTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

  async updateTask(id: number, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return found;
  // }

  // createTask(createTaskDto: CreatTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
