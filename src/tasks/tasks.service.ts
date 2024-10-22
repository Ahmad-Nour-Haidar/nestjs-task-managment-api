import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>, // Inject the Task entity repository
  ) {}

  //
  // findAll(): Task[] {
  //   return this.tasks;
  // }
  //
  // findAllWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   return this.tasks.filter((task) => {
  //     if (status && task.status !== status) {
  //       return false;
  //     }
  //     return (
  //       search &&
  //       (task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase()))
  //     );
  //   });
  // }

  async findOne(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.findOne(id);
  //   task.status = status;
  //   return task;
  // }
  //
  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
