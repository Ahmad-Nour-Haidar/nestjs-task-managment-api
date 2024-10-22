import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

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

  //
  // create(createTaskDto: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: uuidv4(),
  //     title: createTaskDto.title,
  //     description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.findOne(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // remove(id: string): void {
  //   const found = this.findOne(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
